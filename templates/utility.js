const utilityTemplate = {
  name: 'utility',
  description: 'Utility command templates',
  
  templates: {
    userinfo: {
      name: 'userinfo',
      description: 'Display user information',
      options: [{
        name: 'user',
        description: 'User to get info about',
        type: 6,
        required: false
      }],
      generate: () => {
        return `
          const { EmbedBuilder } = require('discord.js');
          
          const targetUser = interaction.options.getUser('user') || interaction.user;
          const member = interaction.guild.members.cache.get(targetUser.id);

          // Build roles list
          const roles = member ? 
            member.roles.cache
              .filter(role => role.id !== interaction.guild.id)
              .map(role => role.toString())
              .join(', ') || 'None' 
            : 'N/A';

          // Get key permissions
          const keyPermissions = member ? 
            member.permissions.toArray()
              .filter(perm => ['Administrator', 'ManageGuild', 'ManageChannels', 'ManageRoles', 'ManageMessages', 'KickMembers', 'BanMembers'].includes(perm))
              .map(perm => perm.replace(/([A-Z])/g, ' $1').trim())
              .join(', ') || 'None'
            : 'N/A';

          const embed = new EmbedBuilder()
            .setTitle(\`User Info - \${targetUser.tag}\`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setColor(member?.displayColor || '#0099ff')
            .addFields([
              { name: 'User ID', value: targetUser.id, inline: true },
              { name: 'Nickname', value: member?.nickname || 'None', inline: true },
              { name: 'Bot', value: targetUser.bot ? 'Yes' : 'No', inline: true },
              { name: 'Account Created', value: \`<t:\${Math.floor(targetUser.createdTimestamp / 1000)}:R>\`, inline: true },
              { name: 'Joined Server', value: member ? \`<t:\${Math.floor(member.joinedTimestamp / 1000)}:R>\` : 'N/A', inline: true },
              { name: \`Roles [\${member?.roles.cache.size - 1 || 0}]\`, value: roles.substring(0, 1024) },
              { name: 'Key Permissions', value: keyPermissions.substring(0, 1024) }
            ]);

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    serverinfo: {
      name: 'serverinfo',
      description: 'Display server information',
      generate: () => {
        return `
          const { EmbedBuilder } = require('discord.js');
          
          const { guild } = interaction;
          const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('#0099ff')
            .addFields([
              { name: 'Owner', value: \`<@\${guild.ownerId}>\`, inline: true },
              { name: 'Created', value: \`<t:\${Math.floor(guild.createdTimestamp / 1000)}:R>\`, inline: true },
              { name: 'Members', value: \`Total: \${guild.memberCount}\`, inline: true },
              { name: 'Channels', value: \`\${guild.channels.cache.size} total\`, inline: true },
              { name: 'Roles', value: \`\${guild.roles.cache.size} roles\`, inline: true },
              { name: 'Boost Level', value: \`Level \${guild.premiumTier}\`, inline: true }
            ]);

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    avatar: {
      name: 'avatar',
      description: 'Get user\'s avatar',
      options: [{
        name: 'user',
        description: 'User to get avatar from',
        type: 6,
        required: false
      }],
      generate: () => {
        return `
          const { EmbedBuilder } = require('discord.js');
          
          const user = interaction.options.getUser('user') || interaction.user;
          const embed = new EmbedBuilder()
            .setTitle(\`\${user.tag}'s Avatar\`)
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setColor('#0099ff');

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    roleinfo: {
      name: 'roleinfo',
      description: 'Display role information',
      options: [{
        name: 'role',
        description: 'Role to get info about',
        type: 8,
        required: true
      }],
      generate: () => {
        return `
          const { EmbedBuilder } = require('discord.js');
          
          const role = interaction.options.getRole('role');
          const members = role.members.size;
          
          const perms = role.permissions.toArray()
            .map(p => p.replace(/([A-Z])/g, ' $1').trim())
            .join(', ') || 'None';

          const embed = new EmbedBuilder()
            .setTitle(role.name)
            .setColor(role.color || 0x0099FF)
            .addFields([
              { name: 'Role ID', value: role.id, inline: true },
              { name: 'Created', value: \`<t:\${Math.floor(role.createdTimestamp / 1000)}:R>\`, inline: true },
              { name: 'Position', value: \`\${role.position}\`, inline: true },
              { name: 'Color', value: \`\${role.hexColor}\`, inline: true },
              { name: 'Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
              { name: 'Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true },
              { name: \`Members [\${members}]\`, value: members === 0 ? 'No members' : \`\${members} member\${members === 1 ? '' : 's'}\` },
              { name: 'Permissions', value: perms.substring(0, 1024) }
            ]);

          await interaction.reply({ embeds: [embed] });`;
      }
    },

    channelinfo: {
      name: 'channelinfo',
      description: 'Display channel information',
      options: [{
        name: 'channel',
        description: 'Channel to get info about',
        type: 7,
        required: false
      }],
      generate: () => {
        return `
          const { EmbedBuilder, ChannelType } = require('discord.js');
          
          const channel = interaction.options.getChannel('channel') || interaction.channel;
          
          const types = {
            [ChannelType.GuildText]: 'Text Channel',
            [ChannelType.GuildVoice]: 'Voice Channel',
            [ChannelType.GuildCategory]: 'Category',
            [ChannelType.GuildAnnouncement]: 'Announcement Channel',
            [ChannelType.AnnouncementThread]: 'News Thread',
            [ChannelType.PublicThread]: 'Public Thread',
            [ChannelType.PrivateThread]: 'Private Thread',
            [ChannelType.GuildStageVoice]: 'Stage Channel',
            [ChannelType.GuildForum]: 'Forum Channel'
          };

          const embed = new EmbedBuilder()
            .setTitle(channel.name)
            .setColor(0x0099FF)
            .addFields([
              { name: 'Channel ID', value: channel.id, inline: true },
              { name: 'Type', value: types[channel.type] || 'Unknown', inline: true },
              { name: 'Category', value: channel.parent?.name || 'None', inline: true },
              { name: 'Created', value: \`<t:\${Math.floor(channel.createdTimestamp / 1000)}:R>\`, inline: true },
              { name: 'Position', value: \`\${channel.position}\`, inline: true }
            ]);

          if (channel.type === ChannelType.GuildText) {
            embed.addFields([
              { name: 'Topic', value: channel.topic || 'No topic set', inline: false },
              { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true },
              { name: 'Slowmode', value: \`\${channel.rateLimitPerUser}s\`, inline: true }
            ]);
          }

          await interaction.reply({ embeds: [embed] });`;
      }
    }
  }
};

module.exports = utilityTemplate;