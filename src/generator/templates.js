const templates = {
    default: `async function execute(interaction) {
        // Generated command code will go here
    }`,
    
    buildExecute(actions) {
        let code = '';
        actions.forEach(action => {
            switch(action.type) {
                case 'sendMessage':
                    code += `await interaction.reply('${action.message}');\n`;
                    break;
                case 'sendEmbed':
                    code += `await interaction.reply({ embeds: [{
                        title: '${action.title}',
                        description: '${action.description}',
                        color: ${action.color || '0x0099ff'}
                    }] });\n`;
                    break;
            }
        });
        return code;
    }
};

module.exports = templates;
