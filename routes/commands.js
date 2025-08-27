const router = require('express').Router();
const { Octokit } = require('@octokit/rest');
const codeGenerator = require('../utils/codeGenerator');
const validator = require('../utils/validator');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const config = {
  owner: 'Ayomide650',
  repo: 'my-bot-data',
  path: 'commands'
};

router.post('/create', async (req, res) => {
  try {
    const validatedData = await validator.validateCommand(req.body);
    const generatedCommand = codeGenerator.generateCommand(validatedData);
    
    const content = Buffer.from(JSON.stringify(generatedCommand, null, 2)).toString('base64');
    const filename = `${validatedData.name}.js`;

    await saveToGitHub(filename, content, `Add command: ${validatedData.name}`);

    res.json({
      success: true,
      command: generatedCommand
    });
  } catch (error) {
    console.error('Command creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const command = await getFromGitHub(`${name}.js`);
    
    if (!command) {
      return res.status(404).json({ error: 'Command not found' });
    }

    res.json(command);
  } catch (error) {
    console.error('Command fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch command' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data } = await octokit.repos.getContent({
      ...config,
      ref: 'main'
    });

    const commands = await Promise.all(
      data
        .filter(file => file.name.endsWith('.js'))
        .map(async file => {
          const content = await getFromGitHub(file.name);
          return {
            name: file.name.replace('.js', ''),
            ...content
          };
        })
    );

    res.json(commands);
  } catch (error) {
    console.error('Commands list error:', error);
    res.status(500).json({ error: 'Failed to list commands' });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await deleteFromGitHub(`${name}.js`);
    res.json({ success: true, message: `Command ${name} deleted` });
  } catch (error) {
    console.error('Command deletion error:', error);
    res.status(500).json({ error: 'Failed to delete command' });
  }
});

async function saveToGitHub(filename, content, message) {
  try {
    const { data: existing } = await octokit.repos.getContent({
      ...config,
      path: filename
    }).catch(() => ({ data: null }));

    await octokit.repos.createOrUpdateFileContents({
      ...config,
      path: filename,
      message,
      content,
      sha: existing?.sha,
      branch: 'main'
    });
  } catch (error) {
    throw new Error(`Failed to save to GitHub: ${error.message}`);
  }
}

async function getFromGitHub(filename) {
  try {
    const { data } = await octokit.repos.getContent({
      ...config,
      path: filename
    });

    const content = Buffer.from(data.content, 'base64').toString();
    return JSON.parse(content);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function deleteFromGitHub(filename) {
  try {
    const { data } = await octokit.repos.getContent({
      ...config,
      path: filename
    });

    await octokit.repos.deleteFile({
      ...config,
      path: filename,
      message: `Delete command: ${filename}`,
      sha: data.sha,
      branch: 'main'
    });
  } catch (error) {
    throw new Error(`Failed to delete from GitHub: ${error.message}`);
  }
}

module.exports = router;
