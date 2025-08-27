const router = require('express').Router();
const discordVars = require('../variables/discord');
const userVars = require('../variables/user');
const serverVars = require('../variables/server');
const channelVars = require('../variables/channel');
const messageVars = require('../variables/message');

router.get('/', (req, res) => {
  try {
    const variables = {
      discord: cleanVariables(discordVars),
      user: cleanVariables(userVars),
      server: cleanVariables(serverVars),
      channel: cleanVariables(channelVars),
      message: cleanVariables(messageVars)
    };
    
    res.json(variables);
  } catch (error) {
    console.error('Error fetching variables:', error);
    res.status(500).json({ error: 'Failed to fetch variables' });
  }
});

router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryMap = {
      discord: discordVars,
      user: userVars,
      server: serverVars,
      channel: channelVars,
      message: messageVars
    };

    const variables = categoryMap[category];
    if (!variables) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(cleanVariables(variables));
  } catch (error) {
    console.error(`Error fetching ${req.params.category} variables:`, error);
    res.status(500).json({ error: 'Failed to fetch variables' });
  }
});

router.get('/search/:term', (req, res) => {
  try {
    const { term } = req.params;
    const results = searchVariables(term.toLowerCase());
    res.json(results);
  } catch (error) {
    console.error('Error searching variables:', error);
    res.status(500).json({ error: 'Failed to search variables' });
  }
});

function cleanVariables(vars) {
  const cleaned = {};
  for (const [key, value] of Object.entries(vars)) {
    if (typeof value === 'object') {
      cleaned[key] = cleanVariables(value);
    } else if (typeof value === 'function') {
      cleaned[key] = value.toString();
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function searchVariables(term) {
  const results = {};
  const categories = {
    discord: discordVars,
    user: userVars,
    server: serverVars,
    channel: channelVars,
    message: messageVars
  };

  for (const [category, vars] of Object.entries(categories)) {
    const matches = findMatches(vars, term);
    if (matches.length > 0) {
      results[category] = matches;
    }
  }

  return results;
}

function findMatches(obj, term, path = '') {
  const matches = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      matches.push(...findMatches(value, term, currentPath));
    }

    if (currentPath.toLowerCase().includes(term) || 
        (typeof value === 'string' && value.toLowerCase().includes(term))) {
      matches.push({
        path: currentPath,
        value: typeof value === 'object' ? 'Object' : value
      });
    }
  }

  return matches;
}

module.exports = router;
