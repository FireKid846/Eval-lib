module.exports = {
  objects: {
    "interaction": {
      description: "The slash command interaction object",
      properties: {
        "interaction.user": "User who triggered the command",
        "interaction.user.id": "User's Discord ID",
        "interaction.user.username": "User's username",
        "interaction.user.displayName": "User's display name",
        "interaction.user.avatar": "User's avatar URL",
        "interaction.user.bot": "Whether user is a bot",
        "interaction.user.createdAt": "Account creation date",
        "interaction.member": "Guild member object",
        "interaction.member.displayName": "Member's server nickname",
        "interaction.member.roles": "Member's roles collection",
        "interaction.member.joinedAt": "When member joined server",
        "interaction.member.permissions": "Member's permissions",
        "interaction.guild": "Server/guild object",
        "interaction.guild.id": "Server's ID",
        "interaction.guild.name": "Server's name",
        "interaction.guild.memberCount": "Number of members",
        "interaction.guild.ownerId": "Server owner's ID",
        "interaction.guild.createdAt": "Server creation date",
        "interaction.channel": "Channel where command was used",
        "interaction.channel.id": "Channel's ID",
        "interaction.channel.name": "Channel's name",
        "interaction.channel.type": "Channel type",
        "interaction.commandName": "Name of the command used",
        "interaction.options": "Command options/arguments",
        "interaction.createdAt": "When interaction was created"
      }
    },
    "message": {
      description: "Message object for message-based commands",
      properties: {
        "message.id": "Message ID",
        "message.content": "Message text content",
        "message.author": "User who sent the message",
        "message.author.id": "Author's Discord ID",
        "message.author.username": "Author's username",
        "message.author.bot": "Whether author is a bot",
        "message.member": "Guild member object of author",
        "message.guild": "Server where message was sent",
        "message.channel": "Channel where message was sent",
        "message.createdAt": "When message was created",
        "message.editedAt": "When message was last edited",
        "message.attachments": "Message attachments",
        "message.embeds": "Message embeds",
        "message.mentions": "Users mentioned in message",
        "message.reactions": "Message reactions",
        "message.url": "Direct link to message"
      }
    },
    "guild": {
      description: "Discord server/guild object",
      properties: {
        "guild.id": "Server's unique ID",
        "guild.name": "Server's name",
        "guild.description": "Server description",
        "guild.icon": "Server icon URL",
        "guild.banner": "Server banner URL",
        "guild.ownerId": "Server owner's user ID",
        "guild.memberCount": "Total number of members",
        "guild.createdAt": "When server was created",
        "guild.verificationLevel": "Server verification level",
        "guild.channels": "All server channels",
        "guild.roles": "All server roles",
        "guild.emojis": "Custom server emojis",
        "guild.features": "Server features array"
      }
    },
    "member": {
      description: "Guild member object",
      properties: {
        "member.id": "Member's user ID",
        "member.user": "User object of the member",
        "member.displayName": "Member's display name in server",
        "member.nickname": "Member's server nickname",
        "member.roles": "Member's roles collection",
        "member.joinedAt": "When member joined the server",
        "member.permissions": "Member's permissions in server",
        "member.voice": "Member's voice state",
        "member.presence": "Member's presence status",
        "member.avatar": "Member's server avatar"
      }
    },
    "channel": {
      description: "Discord channel object",
      properties: {
        "channel.id": "Channel's unique ID",
        "channel.name": "Channel's name",
        "channel.type": "Channel type (text, voice, etc)",
        "channel.topic": "Channel topic/description",
        "channel.nsfw": "Whether channel is NSFW",
        "channel.position": "Channel position in list",
        "channel.createdAt": "When channel was created",
        "channel.parent": "Channel's parent category",
        "channel.permissions": "Channel permission overwrites"
      }
    },
    "user": {
      description: "Discord user object",
      properties: {
        "user.id": "User's unique Discord ID",
        "user.username": "User's username",
        "user.displayName": "User's display name",
        "user.discriminator": "User's discriminator (if any)",
        "user.avatar": "User's avatar URL",
        "user.banner": "User's banner URL",
        "user.bot": "Whether user is a bot",
        "user.system": "Whether user is a system user",
        "user.createdAt": "Account creation timestamp"
      }
    }
  },
  
  methods: {
    "interaction.reply": {
      description: "Reply to a slash command interaction",
      syntax: "interaction.reply(content)",
      parameters: {
        "content": "String or embed object to send",
        "ephemeral": "Whether reply is only visible to user",
        "fetchReply": "Whether to return the reply message"
      },
      examples: [
        "interaction.reply('Hello!')",
        "interaction.reply({content: 'Hello!', ephemeral: true})"
      ]
    },
    "interaction.followUp": {
      description: "Send a follow-up message after replying",
      syntax: "interaction.followUp(content)",
      parameters: {
        "content": "Message content to send",
        "ephemeral": "Whether message is only visible to user"
      }
    },
    "interaction.editReply": {
      description: "Edit the initial reply",
      syntax: "interaction.editReply(content)",
      parameters: {
        "content": "New content for the reply"
      }
    },
    "interaction.deleteReply": {
      description: "Delete the initial reply",
      syntax: "interaction.deleteReply()"
    },
    "message.reply": {
      description: "Reply to a message",
      syntax: "message.reply(content)",
      parameters: {
        "content": "Reply content"
      }
    },
    "message.delete": {
      description: "Delete a message",
      syntax: "message.delete()",
      parameters: {}
    },
    "message.edit": {
      description: "Edit a message",
      syntax: "message.edit(content)",
      parameters: {
        "content": "New message content"
      }
    },
    "message.react": {
      description: "Add reaction to message",
      syntax: "message.react(emoji)",
      parameters: {
        "emoji": "Emoji to react with"
      }
    },
    "channel.send": {
      description: "Send message to channel",
      syntax: "channel.send(content)",
      parameters: {
        "content": "Message content to send"
      }
    },
    "channel.bulkDelete": {
      description: "Delete multiple messages",
      syntax: "channel.bulkDelete(amount)",
      parameters: {
        "amount": "Number of messages to delete (2-100)"
      }
    },
    "member.kick": {
      description: "Kick member from server",
      syntax: "member.kick(reason)",
      parameters: {
        "reason": "Reason for kicking"
      }
    },
    "member.ban": {
      description: "Ban member from server",
      syntax: "member.ban(options)",
      parameters: {
        "reason": "Reason for ban",
        "deleteMessageDays": "Days of messages to delete"
      }
    },
    "member.timeout": {
      description: "Timeout member",
      syntax: "member.timeout(duration, reason)",
      parameters: {
        "duration": "Timeout duration in milliseconds",
        "reason": "Reason for timeout"
      }
    },
    "member.roles.add": {
      description: "Add role to member",
      syntax: "member.roles.add(role)",
      parameters: {
        "role": "Role ID or role object"
      }
    },
    "member.roles.remove": {
      description: "Remove role from member",
      syntax: "member.roles.remove(role)",
      parameters: {
        "role": "Role ID or role object"
      }
    },
    "guild.members.fetch": {
      description: "Fetch guild member",
      syntax: "guild.members.fetch(userId)",
      parameters: {
        "userId": "ID of user to fetch"
      }
    },
    "guild.channels.create": {
      description: "Create new channel",
      syntax: "guild.channels.create(options)",
      parameters: {
        "name": "Channel name",
        "type": "Channel type",
        "parent": "Parent category"
      }
    },
    "guild.roles.create": {
      description: "Create new role",
      syntax: "guild.roles.create(options)",
      parameters: {
        "name": "Role name",
        "color": "Role color",
        "permissions": "Role permissions"
      }
    }
  },

  utilities: {
    "Math.random": {
      description: "Generate random number between 0 and 1",
      syntax: "Math.random()"
    },
    "Math.floor": {
      description: "Round number down",
      syntax: "Math.floor(number)"
    },
    "Date.now": {
      description: "Current timestamp",
      syntax: "Date.now()"
    },
    "setTimeout": {
      description: "Execute function after delay",
      syntax: "setTimeout(function, delay)"
    },
    "JSON.stringify": {
      description: "Convert object to JSON string",
      syntax: "JSON.stringify(object)"
    },
    "JSON.parse": {
      description: "Parse JSON string to object",
      syntax: "JSON.parse(string)"
    }
  },

  embeds: {
    "EmbedBuilder": {
      description: "Create embed message",
      methods: {
        "setTitle": "Set embed title",
        "setDescription": "Set embed description", 
        "setColor": "Set embed color",
        "addFields": "Add fields to embed",
        "setImage": "Set embed image",
        "setThumbnail": "Set embed thumbnail",
        "setFooter": "Set embed footer",
        "setTimestamp": "Set embed timestamp",
        "setAuthor": "Set embed author"
      }
    }
  },

  conditions: {
    "if": {
      description: "Conditional statement",
      syntax: "if (condition) { code }"
    },
    "else": {
      description: "Alternative condition",
      syntax: "else { code }"
    },
    "includes": {
      description: "Check if string contains text",
      syntax: "string.includes('text')"
    },
    "startsWith": {
      description: "Check if string starts with text",
      syntax: "string.startsWith('text')"
    },
    "endsWith": {
      description: "Check if string ends with text", 
      syntax: "string.endsWith('text')"
    },
    "length": {
      description: "Get length of string or array",
      syntax: "string.length"
    },
    "toLowerCase": {
      description: "Convert string to lowercase",
      syntax: "string.toLowerCase()"
    },
    "toUpperCase": {
      description: "Convert string to uppercase", 
      syntax: "string.toUpperCase()"
    }
  },

  permissions: {
    "ADMINISTRATOR": "Administrator permission",
    "MANAGE_GUILD": "Manage server permission",
    "MANAGE_ROLES": "Manage roles permission",
    "MANAGE_CHANNELS": "Manage channels permission",
    "KICK_MEMBERS": "Kick members permission",
    "BAN_MEMBERS": "Ban members permission",
    "MANAGE_MESSAGES": "Manage messages permission",
    "SEND_MESSAGES": "Send messages permission",
    "EMBED_LINKS": "Embed links permission",
    "ATTACH_FILES": "Attach files permission",
    "READ_MESSAGE_HISTORY": "Read message history permission",
    "MENTION_EVERYONE": "Mention everyone permission",
    "USE_EXTERNAL_EMOJIS": "Use external emojis permission",
    "CONNECT": "Connect to voice channel permission",
    "SPEAK": "Speak in voice channel permission",
    "MUTE_MEMBERS": "Mute members permission",
    "DEAFEN_MEMBERS": "Deafen members permission",
    "MOVE_MEMBERS": "Move members permission"
  }
};