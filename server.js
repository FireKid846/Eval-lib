const express = require('express');
const cors = require('cors');

const commandRoutes = require('./routes/commands');
const variableRoutes = require('./routes/variables');
const templateRoutes = require('./routes/templates');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const githubToken = req.headers['x-github-token'];
  
  if (!githubToken || githubToken !== process.env.GITHUB_TOKEN) {
    return res.status(401).json({ error: 'Invalid GitHub token' });
  }
  
  next();
});

app.use('/api/commands', commandRoutes);
app.use('/api/variables', variableRoutes);
app.use('/api/templates', templateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));