const modTemplate = {
  name: 'moderation',
  description: 'Moderation command templates',
  
  templates: {
    kick: {
      name: 'kick',
      description: 'Kick a member from the server',
      options: [
        {
          name: 'user',
          description: 'User to kick',
          type: 6,
          required: true
        },
        {
          name: 'reason',
          description: 'Reason for kick',
          type: 3,
          required: false
        }
      ],
      generate: (data) => {
        return `
          const targetUser = interaction.options.getUser('user');
          const reason = interaction.options.getString('reason') || 'No reason provided';
          const member = interaction.guild.members.cache.get(targetUser.id);

          if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
          }

          if (!member.kickable) {
            return interaction.reply({ 
              content: 'I cannot kick this user. Check if they have a higher role than me or if I have kick permissions.',
              ephemeral: true 
            });
          }

          try {
            await member.kick(reason);
            
            const embedKick = new EmbedBuilder()
              .setTitle('Member Kicked')
              .setColor(0xff0000)
              .setThumbnail(targetUser.displayAvatarURL())
              .addFields(
                { name: 'User', value: targetUser.tag },
                { name: 'Moderator', value: interaction.user.tag },
                { name: 'Reason', value: reason }
              )
              .setTimestamp();

            await interaction.reply({ embeds: [embedKick] });
            
            if (data.logging?.enabled) {
              const logChannel = interaction.guild.channels.cache.get(data.logging.channelId);
              if (logChannel) {
                await logChannel.send({ embeds: [embedKick] });
              }
            }
          } catch (error) {
            console.error('Kick command error:', error);
            await interaction.reply({ 
              content: 'Failed to kick the user. Please check my permissions and try again.',
              ephemeral: true 
            });
          }`;
      }
    },
    
    ban: {
      name: 'ban',
      description: 'Ban a member from the server',
      options: [
        {
          name: 'user',
          description: 'User to ban',
          type: 6,
          required: true
        },
        {
          name: 'reason',
          description: 'Reason for ban',
          type: 3,
          required: false
        },
        {
          name: 'days',
          description: 'Days of messages to delete',
          type: 4,
          required: false,
          choices: [
            { name: 'Don\'t delete any', value: 0 },
            { name: 'Previous 24 hours', value: 1 },
            { name: 'Previous 7 days', value: 7 }
          ]
        }
      ],
      generate: (data) => {
        return `
          const targetUser = interaction.options.getUser('user');
          const reason = interaction.options.getString('reason') || 'No reason provided';
          const days = interaction.options.getInteger('days') || 0;

          try {
            await interaction.guild.members.ban(targetUser, { 
              reason: reason,
              deleteMessageDays: days
            });

            const embedBan = new EmbedBuilder()
              .setTitle('Member Banned')
              .setColor(0xff0000)
              .setThumbnail(targetUser.displayAvatarURL())
              .addFields(
                { name: 'User', value: targetUser.tag },
                { name: 'Moderator', value: interaction.user.tag },
                { name: 'Reason', value: reason },
                { name: 'Message Deletion', value: \`\${days} days\` }
              )
              .setTimestamp();

            await interaction.reply({ embeds: [embedBan] });

            if (data.logging?.enabled) {
              const logChannel = interaction.guild.channels.cache.get(data.logging.channelId);
              if (logChannel) {
                await logChannel.send({ embeds: [embedBan] });
              }
            }
          } catch (error) {
            console.error('Ban command error:', error);
            await interaction.reply({ 
              content: 'Failed to ban the user. Please check my permissions and try again.',
              ephemeral: true 
            });
          }`;
      }
    },
    
    timeout: {
      name: 'timeout',
      description: 'Timeout a member',
      options: [
        {
          name: 'user',
          description: 'User to timeout',
          type: 6,
          required: true
        },
        {
          name: 'duration',
          description: 'Timeout duration in minutes',
          type: 4,
          required: true
        },
        {
          name: 'reason',
          description: 'Reason for timeout',
          type: 3,
          required: false
        }
      ],
      generate: (data) => {
        return `
          const targetUser = interaction.options.getUser('user');
          const duration = interaction.options.getInteger('duration');
          const reason = interaction.options.getString('reason') || 'No reason provided';
          const member = interaction.guild.members.cache.get(targetUser.id);

          if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
          }

          try {
            await member.timeout(duration * 60 * 1000, reason);

            const embedTimeout = new EmbedBuilder()
              .setTitle('Member Timed Out')
              .setColor(0xffa500)
              .setThumbnail(targetUser.displayAvatarURL())
              .addFields(
                { name: 'User', value: targetUser.tag },
                { name: 'Moderator', value: interaction.user.tag },
                { name: 'Duration', value: \`\${duration} minutes\` },
                { name: 'Reason', value: reason }
              )
              .setTimestamp();

            await interaction.reply({ embeds: [embedTimeout] });

            if (data.logging?.enabled) {
              const logChannel = interaction.guild.channels.cache.get(data.logging.channelId);
              if (logChannel) {
                await logChannel.send({ embeds: [embedTimeout] });
              }
            }
          } catch (error) {
            console.error('Timeout command error:', error);
            await interaction.reply({ 
              content: 'Failed to timeout the user. Please check my permissions and try again.',
              ephemeral: true 
            });
          }`;
      }
    },
    
    warn: {
      name: 'warn',
      description: 'Warn a user',
      options: [{
        name: 'user',
        description: 'User to warn',
        type: 6,
        required: true
      }, {
        name: 'reason',
        description: 'Reason for warning',
        type: 3,
        required: true
      }],
      generate: (data) => {
        const { logging = {} } = data;
        return `
          const targetUser = interaction.options.getUser('user');
          const reason = interaction.options.getString('reason');
          const member = interaction.guild.members.cache.get(targetUser.id);

          if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
          }

          const embed = new EmbedBuilder()
            .setTitle('User Warned')
            .setColor(0xFFD700)
            .setThumbnail(targetUser.displayAvatarURL())
            .addFields(
              { name: 'User', value: targetUser.tag, inline: true },
              { name: 'Moderator', value: interaction.user.tag, inline: true },
              { name: 'Reason', value: reason }
            )
            .setTimestamp();

          await interaction.reply({ embeds: [embed] });

          ${logging.enabled ? `
          const logChannel = interaction.guild.channels.cache.get('${logging.channelId}');
          if (logChannel) {
            await logChannel.send({ embeds: [embed] });
          }
          ` : ''}

          try {
            await targetUser.send({ 
              content: \`You were warned in \${interaction.guild.name}\nReason: \${reason}\` 
            });
          } catch (err) {
            await interaction.followUp({ 
              content: 'Warning sent but unable to DM user.',
              ephemeral: true 
            });
          }`;
      }
    },

    purge: {
      name: 'purge',
      description: 'Delete multiple messages',
      options: [{
        name: 'amount',
        description: 'Number of messages to delete (1-100)',
        type: 4,
        required: true,
        minValue: 1,
        maxValue: 100
      }],
      generate: (data) => {
        return `
          const amount = interaction.options.getInteger('amount');
          
          try {
            const deleted = await interaction.channel.bulkDelete(amount, true);
            
            const embed = new EmbedBuilder()
              .setTitle('Messages Purged')
              .setColor(0x00FF00)
              .setDescription(\`Successfully deleted \${deleted.size} messages\`)
              .setFooter({ text: \`Requested by \${interaction.user.tag}\` })
              .setTimestamp();
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
          } catch (error) {
            if (error.code === 50034) {
              await interaction.reply({ 
                content: 'Unable to delete messages older than 14 days.',
                ephemeral: true 
              });
            } else {
              await interaction.reply({ 
                content: 'Error deleting messages.',
                ephemeral: true 
              });
            }
          }`;
      }
    }
  }
};

module.exports = modTemplate;
