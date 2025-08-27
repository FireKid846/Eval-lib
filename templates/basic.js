module.exports = {
  name: 'basic',
  description: 'Basic command templates',
  
  templates: {
    simpleReply: {
      name: 'reply',
      description: 'Simple text reply command',
      generate: (data) => {
        const { content } = data;
        return `await interaction.reply(${JSON.stringify(content)});`;
      }
    },

    embedReply: {
      name: 'embed',
      description: 'Simple embed reply command',
      generate: (data) => {
        const { title, description, color = '#0099ff' } = data;
        return `
          const embed = new EmbedBuilder()
            .setTitle(${JSON.stringify(title)})
            .setDescription(${JSON.stringify(description)})
            .setColor('${color}');
          
          await interaction.reply({ embeds: [embed] });`;
      }
    },

    echo: {
      name: 'echo',
      description: 'Echo back user input',
      options: [{
        name: 'message',
        description: 'Message to echo',
        type: 3,
        required: true
      }],
      generate: () => {
        return `
          const message = interaction.options.getString('message');
          await interaction.reply(\`You said: \${message}\`);`;
      }
    },

    ping: {
      name: 'ping',
      description: 'Check bot latency',
      generate: () => {
        return `
          const sent = await interaction.reply({ 
            content: 'Pinging...', 
            fetchReply: true 
          });
          const latency = sent.createdTimestamp - interaction.createdTimestamp;
          await interaction.editReply(
            \`Pong! Bot Latency: \${latency}ms, API Latency: \${interaction.client.ws.ping}ms\`
          );`;
      }
    }
  }
};
