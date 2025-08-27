const templates = require('./templates');

function generateCommand(formData) {
    const { name, description, type, actions } = formData;
    
    // Basic command structure
    const command = {
        name,
        description,
        options: formData.options || [],
        execute: templates[type] || templates.default
    };

    // Convert visual blocks to code
    const commandCode = templates.buildExecute(actions);
    
    return {
        success: true,
        command: command,
        code: commandCode
    };
}

exports.generateCommand = generateCommand;
