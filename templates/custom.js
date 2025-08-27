const customTemplate = {
  name: 'custom',
  description: 'Custom command template with dynamic code generation',
  
  templates: {
    advanced: {
      name: 'advanced',
      description: 'Advanced custom command with multiple features',
      generate: (data) => {
        const { 
          variables = [], 
          conditions = [], 
          actions = [], 
          content = '',
          errorHandling = true,
          cooldown = 0,
          permissions = []
        } = data;

        return `
          ${permissions.length > 0 ? `
          if (!interaction.member.permissions.has(['${permissions.join("', '")}'])) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
          }` : ''}

          ${cooldown > 0 ? `
          const cooldownKey = \`\${interaction.commandName}-\${interaction.user.id}\`;
          if (cooldowns.has(cooldownKey)) {
            const timeLeft = Math.ceil((cooldowns.get(cooldownKey) - Date.now()) / 1000);
            return interaction.reply({ content: \`Please wait \${timeLeft} seconds before using this command again.\`, ephemeral: true });
          }` : ''}

          try {
            ${variables.map(v => `const ${v.name} = ${v.value};`).join('\n            ')}

            ${conditions.map(c => `
            if (${c.condition}) {
              ${c.action}
            }`).join('\n            ')}

            ${actions.map(action => {
              switch (action.type) {
                case 'database':
                  return `
                    const data = await db.get('${action.key}');
                    ${action.operation}(data);
                  `;
                case 'api':
                  return `
                    const response = await fetch('${action.url}', {
                      method: '${action.method || 'GET'}',
                      headers: ${JSON.stringify(action.headers || {})},
                      body: ${action.body ? JSON.stringify(action.body) : 'null'}
                    });
                    const result = await response.json();
                  `;
                case 'role':
                  return `
                    const role = interaction.guild.roles.cache.get('${action.roleId}');
                    await interaction.member.roles.${action.operation}(role);
                  `;
                default:
                  return action.code || '';
              }
            }).join('\n            ')}

            ${content ? `
            const finalResponse = \`${content}\`;
            await interaction.reply(finalResponse);
            ` : ''}

            ${cooldown > 0 ? `
            cooldowns.set(cooldownKey, Date.now() + ${cooldown * 1000});
            setTimeout(() => cooldowns.delete(cooldownKey), ${cooldown * 1000});` : ''}

          } catch (error) {
            console.error('Custom command error:', error);
            ${errorHandling ? `
            await interaction.reply({ 
              content: 'An error occurred while executing the command.',
              ephemeral: true 
            });` : ''}
          }`;
      }
    },

    simple: {
      name: 'simple',
      description: 'Simple custom command template',
      generate: (data) => {
        const { content = 'Hello!', responseType = 'reply' } = data;
        return `
          try {
            ${responseType === 'embed' ? `
              const embed = new EmbedBuilder()
                .setDescription('${content}')
                .setColor('#0099ff');
              await interaction.reply({ embeds: [embed] });` :
              `await interaction.reply('${content}');`}
          } catch (error) {
            console.error('Command error:', error);
            await interaction.reply({ content: 'An error occurred.', ephemeral: true });
          }`;
      }
    }
  }
};

module.exports = customTemplate;