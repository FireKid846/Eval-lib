const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const TEMPLATE_DIR = path.join(__dirname, '../templates');

router.get('/', async (req, res) => {
  try {
    const templates = await loadAllTemplates();
    res.json(templates);
  } catch (error) {
    console.error('Error loading templates:', error);
    res.status(500).json({ error: 'Failed to load templates' });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const template = await loadTemplateCategory(category);
    
    if (!template) {
      return res.status(404).json({ error: 'Template category not found' });
    }
    
    res.json(template);
  } catch (error) {
    console.error(`Error loading template category ${req.params.category}:`, error);
    res.status(500).json({ error: 'Failed to load template category' });
  }
});

router.post('/preview', async (req, res) => {
  try {
    const { category, data } = req.body;
    const template = await loadTemplateCategory(category);
    
    if (!template) {
      return res.status(404).json({ error: 'Template category not found' });
    }
    
    const preview = template.generate(data);
    res.json({ preview });
  } catch (error) {
    console.error('Error generating template preview:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

async function loadAllTemplates() {
  const files = await fs.readdir(TEMPLATE_DIR);
  const templates = {};
  
  for (const file of files) {
    if (file.endsWith('.js')) {
      const name = path.basename(file, '.js');
      const template = require(path.join(TEMPLATE_DIR, file));
      templates[name] = {
        name: template.name,
        description: template.description,
        templates: template.templates || {}
      };
    }
  }
  
  return templates;
}

async function loadTemplateCategory(category) {
  const templatePath = path.join(TEMPLATE_DIR, `${category}.js`);
  try {
    return require(templatePath);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return null;
    }
    throw error;
  }
}

module.exports = router;
