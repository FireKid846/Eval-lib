module.exports = {
  properties: {
    basic: {
      id: {
        type: "string",
        description: "Channel's unique ID",
        example: "123456789012345678"
      },
      name: {
        type: "string",
        description: "Channel name",
        example: "general-chat"
      },
      type: {
        type: "enum",
        description: "Channel type",
        values: {
          GUILD_TEXT: 0,
          DM: 1,
          GUILD_VOICE: 2,
          GROUP_DM: 3,
          GUILD_CATEGORY: 4,
          GUILD_NEWS: 5,
          GUILD_NEWS_THREAD: 10,
          GUILD_PUBLIC_THREAD: 11,
          GUILD_PRIVATE_THREAD: 12,
          GUILD_STAGE_VOICE: 13,
          GUILD_FORUM: 15
        }
      },
      topic: {
        type: "string",
        description: "Channel topic (text channels only)",
        example: "Welcome to our general discussion channel"
      },
      position: {
        type: "number",
        description: "Channel position in the list",
        example: 1
      },
      parentId: {
        type: "string",
        description: "ID of the parent category",
        example: "123456789012345678"
      },
      nsfw: {
        type: "boolean",
        description: "Whether the channel is NSFW",
        example: false
      },
      rateLimitPerUser: {
        type: "number",
        description: "Slowmode delay in seconds",
        example: 0
      }
    }
  },

  methods: {
    send: {
      description: "Send a message to the channel",
      parameters: {
        content: "Text content",
        embeds: "Array of embeds",
        files: "Array of files",
        components: "Message components"
      },
      example: "channel.send('Hello world!')"
    },
    bulkDelete: {
      description: "Delete multiple messages",
      parameters: {
        amount: "Number of messages (2-100)",
        filterOld: "Filter messages older than 2 weeks"
      },
      example: "channel.bulkDelete(10)"
    },
    setName: {
      description: "Change channel name",
      parameters: {
        name: "New channel name"
      },
      example: "channel.setName('new-name')"
    },
    setTopic: {
      description: "Set channel topic",
      parameters: {
        topic: "Channel topic text"
      },
      example: "channel.setTopic('Channel topic')"
    },
    setPosition: {
      description: "Change channel position",
      parameters: {
        position: "New position number"
      },
      example: "channel.setPosition(5)"
    },
    setParent: {
      description: "Move channel to a category",
      parameters: {
        parent: "Category channel or ID"
      },
      example: "channel.setParent('123456789012345678')"
    },
    createInvite: {
      description: "Create an invite to the channel",
      parameters: {
        maxAge: "Invite expiration time in seconds",
        maxUses: "Maximum number of uses",
        temporary: "Whether members should be kicked after disconnecting"
      },
      example: "channel.createInvite({maxAge: 86400})"
    },
    createWebhook: {
      description: "Create a webhook for the channel",
      parameters: {
        name: "Webhook name",
        avatar: "Webhook avatar"
      },
      example: "channel.createWebhook({name: 'Bot Webhook'})"
    },
    fetchWebhooks: {
      description: "Fetch all webhooks in the channel",
      parameters: {},
      example: "channel.fetchWebhooks()"
    }
  },

  permissions: {
    VIEW_CHANNEL: {
      type: "boolean",
      description: "Can view the channel",
      example: "channel.permissionsFor(user).has('VIEW_CHANNEL')"
    },
    SEND_MESSAGES: {
      type: "boolean",
      description: "Can send messages",
      example: "channel.permissionsFor(user).has('SEND_MESSAGES')"
    },
    MANAGE_MESSAGES: {
      type: "boolean",
      description: "Can manage messages",
      example: "channel.permissionsFor(user).has('MANAGE_MESSAGES')"
    },
    EMBED_LINKS: {
      type: "boolean",
      description: "Can embed links in messages",
      example: "channel.permissionsFor(user).has('EMBED_LINKS')"
    },
    ATTACH_FILES: {
      type: "boolean",
      description: "Can attach files to messages",
      example: "channel.permissionsFor(user).has('ATTACH_FILES')"
    },
    READ_MESSAGE_HISTORY: {
      type: "boolean",
      description: "Can read message history",
      example: "channel.permissionsFor(user).has('READ_MESSAGE_HISTORY')"
    },
    MANAGE_CHANNEL: {
      type: "boolean",
      description: "Can manage the channel",
      example: "channel.permissionsFor(user).has('MANAGE_CHANNEL')"
    },
    CREATE_INSTANT_INVITE: {
      type: "boolean",
      description: "Can create invites",
      example: "channel.permissionsFor(user).has('CREATE_INSTANT_INVITE')"
    },
    MANAGE_WEBHOOKS: {
      type: "boolean",
      description: "Can manage webhooks",
      example: "channel.permissionsFor(user).has('MANAGE_WEBHOOKS')"
    }
  },

  events: {
    messageCreate: {
      description: "When a message is sent",
      data: {
        message: "Message object"
      }
    },
    messageDelete: {
      description: "When a message is deleted",
      data: {
        message: "Deleted message object"
      }
    },
    messageUpdate: {
      description: "When a message is edited",
      data: {
        oldMessage: "Original message",
        newMessage: "Updated message"
      }
    },
    channelCreate: {
      description: "When a channel is created",
      data: {
        channel: "Created channel object"
      }
    },
    channelDelete: {
      description: "When a channel is deleted",
      data: {
        channel: "Deleted channel object"
      }
    },
    channelUpdate: {
      description: "When a channel is updated",
      data: {
        oldChannel: "Original channel",
        newChannel: "Updated channel"
      }
    },
    webhookUpdate: {
      description: "When channel webhooks are updated",
      data: {
        channel: "Channel with updated webhooks"
      }
    }
  },

  flags: {
    PINNED: {
      description: "Message is pinned",
      value: 1
    },
    URGENT: {
      description: "Message is urgent",
      value: 2
    },
    CROSSPOSTED: {
      description: "Message is crossposted",
      value: 4
    },
    IS_CROSSPOST: {
      description: "Message is a crosspost",
      value: 8
    },
    SUPPRESS_EMBEDS: {
      description: "Message embeds are suppressed",
      value: 16
    }
  },

  validators: {
    isText: {
      description: "Check if channel is a text channel",
      example: "channel.type === ChannelType.GuildText"
    },
    isVoice: {
      description: "Check if channel is a voice channel",
      example: "channel.type === ChannelType.GuildVoice"
    },
    isCategory: {
      description: "Check if channel is a category",
      example: "channel.type === ChannelType.GuildCategory"
    },
    isThread: {
      description: "Check if channel is a thread",
      example: "channel.isThread()"
    },
    isNews: {
      description: "Check if channel is a news channel",
      example: "channel.type === ChannelType.GuildAnnouncement"
    },
    isForum: {
      description: "Check if channel is a forum channel",
      example: "channel.type === ChannelType.GuildForum"
    },
    isDM: {
      description: "Check if channel is a DM channel",
      example: "channel.type === ChannelType.DM"
    },
    isManageable: {
      description: "Check if the bot can manage the channel",
      example: "channel.manageable"
    },
    isViewable: {
      description: "Check if the bot can view the channel",
      example: "channel.viewable"
    }
  }
};