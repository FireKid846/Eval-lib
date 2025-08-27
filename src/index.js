const express = require('express');
const app = express();
const { getAvailableBlocks } = require('./blocks');
const { generateCommand } = require('./generator');

app.use(express.json());

// Endpoint to get available command blocks
app.get('/api/blocks', (req, res) => {
    const blocks = getAvailableBlocks();
    res.json(blocks);
});

// Endpoint to create command
app.post('/api/create', (req, res) => {
    const command = generateCommand(req.body);
    res.json(command);
});

app.listen(3000, () => console.log('Command builder API running'));
