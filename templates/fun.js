const funTemplate = {
  name: 'fun',
  description: 'Fun and entertainment command templates',
  
  templates: {
    eightball: {
      name: '8ball',
      description: 'Ask the magic 8ball a question',
      options: [{
        name: 'question',
        description: 'Your question for the magic 8ball',
        type: 3,
        required: true
      }],
      generate: () => {
        return `
          const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes, definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
          ];

          const question = interaction.options.getString('question');
          const response = responses[Math.floor(Math.random() * responses.length)];

          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🎱 Magic 8Ball')
            .addFields(
              { name: 'Question', value: question },
              { name: 'Answer', value: response }
            )
            .setFooter({ text: \`Asked by \${interaction.user.tag}\` });

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    dice: {
      name: 'roll',
      description: 'Roll one or more dice',
      options: [
        {
          name: 'dice',
          description: 'Number of dice to roll (1-10)',
          type: 4,
          required: true,
          minValue: 1,
          maxValue: 10
        },
        {
          name: 'sides',
          description: 'Number of sides per die (2-100)',
          type: 4,
          required: false,
          minValue: 2,
          maxValue: 100
        }
      ],
      generate: () => {
        return `
          const diceCount = interaction.options.getInteger('dice');
          const sides = interaction.options.getInteger('sides') || 6;
          
          const rolls = [];
          let total = 0;
          
          for (let i = 0; i < diceCount; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
          }

          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🎲 Dice Roll')
            .addFields(
              { name: 'Dice', value: \`\${diceCount}d\${sides}\` },
              { name: 'Rolls', value: rolls.join(', ') },
              { name: 'Total', value: total.toString() }
            )
            .setFooter({ text: \`Rolled by \${interaction.user.tag}\` });

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    rps: {
      name: 'rps',
      description: 'Play Rock, Paper, Scissors',
      options: [{
        name: 'choice',
        description: 'Your choice (rock/paper/scissors)',
        type: 3,
        required: true,
        choices: [
          { name: 'Rock', value: 'rock' },
          { name: 'Paper', value: 'paper' },
          { name: 'Scissors', value: 'scissors' }
        ]
      }],
      generate: () => {
        return `
          const choices = ['rock', 'paper', 'scissors'];
          const botChoice = choices[Math.floor(Math.random() * choices.length)];
          const playerChoice = interaction.options.getString('choice');
          
          const emojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
          };

          let result;
          if (playerChoice === botChoice) {
            result = "It's a tie!";
          } else if (
            (playerChoice === 'rock' && botChoice === 'scissors') ||
            (playerChoice === 'paper' && botChoice === 'rock') ||
            (playerChoice === 'scissors' && botChoice === 'paper')
          ) {
            result = 'You win!';
          } else {
            result = 'I win!';
          }

          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Rock, Paper, Scissors')
            .addFields(
              { name: 'Your Choice', value: \`\${emojis[playerChoice]} \${playerChoice}\`, inline: true },
              { name: 'My Choice', value: \`\${emojis[botChoice]} \${botChoice}\`, inline: true },
              { name: 'Result', value: result }
            )
            .setFooter({ text: \`Played with \${interaction.user.tag}\` });

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    coinflip: {
      name: 'flip',
      description: 'Flip a coin',
      options: [],
      generate: () => {
        return `
          const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
          const emoji = result === 'Heads' ? '🪙' : '💿';

          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Coin Flip')
            .setDescription(\`\${emoji} The coin landed on **\${result}**!\`)
            .setFooter({ text: \`Flipped by \${interaction.user.tag}\` });

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    randomQuote: {
      name: 'quote',
      description: 'Get a random quote',
      generate: (data) => {
        return `
          const quotes = [
            { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
          ];
          
          const quote = quotes[Math.floor(Math.random() * quotes.length)];
          
          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(\`"\${quote.text}"\`)
            .setFooter({ text: \`- \${quote.author}\` });
          
          await interaction.reply({ embeds: [embed] });`;
      }
    },

    poll: {
      name: 'poll',
      description: 'Create a reaction poll',
      options: [{
        name: 'question',
        description: 'Poll question',
        type: 3,
        required: true
      }, {
        name: 'options',
        description: 'Poll options (comma separated)',
        type: 3,
        required: true
      }],
      generate: () => {
        return `
          const question = interaction.options.getString('question');
          const options = interaction.options.getString('options').split(',').map(opt => opt.trim());
          
          if (options.length < 2 || options.length > 10) {
            return interaction.reply({ 
              content: 'Please provide between 2 and 10 options!',
              ephemeral: true 
            });
          }
          
          const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
          
          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 ' + question)
            .setDescription(
              options.map((opt, i) => \`\${reactions[i]} \${opt}\`).join('\\n')
            )
            .setFooter({ text: \`Poll started by \${interaction.user.tag}\` });
          
          const message = await interaction.reply({ 
            embeds: [embed],
            fetchReply: true 
          });
          
          for (let i = 0; i < options.length; i++) {
            await message.react(reactions[i]);
          }`;
      }
    },

    giveaway: {
      name: 'giveaway',
      description: 'Start a giveaway',
      options: [{
        name: 'prize',
        description: 'What are you giving away?',
        type: 3,
        required: true
      }, {
        name: 'duration',
        description: 'Duration in minutes',
        type: 4,
        required: true,
        minValue: 1,
        maxValue: 1440
      }],
      generate: () => {
        return `
          const prize = interaction.options.getString('prize');
          const duration = interaction.options.getInteger('duration') * 60000;
          const endTime = Date.now() + duration;
          
          const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎉 Giveaway!')
            .setDescription(\`
              **Prize:** \${prize}
              **Ends:** <t:\${Math.floor(endTime / 1000)}:R>
              React with 🎉 to enter!
            \`)
            .setFooter({ text: \`Started by \${interaction.user.tag}\` });
          
          const message = await interaction.reply({ 
            embeds: [embed],
            fetchReply: true 
          });
          
          await message.react('🎉');
          
          setTimeout(async () => {
            const fetchedMessage = await message.fetch();
            const reaction = fetchedMessage.reactions.cache.get('🎉');
            
            const users = await reaction.users.fetch();
            const validUsers = users.filter(user => !user.bot);
            
            if (validUsers.size === 0) {
              return message.reply('No valid entries for the giveaway!');
            }
            
            const winner = validUsers.random();
            
            const winEmbed = new EmbedBuilder()
              .setColor(0xFF0000)
              .setTitle('🎉 Giveaway Ended!')
              .setDescription(\`
                **Prize:** \${prize}
                **Winner:** <@\${winner.id}>
              \`);
            
            await message.reply({ embeds: [winEmbed] });
          }, duration);`;
      }
    }
  }
};

module.exports = funTemplate;
