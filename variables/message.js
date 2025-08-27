module.exports = {
  properties: {
    basic: {
      id: {
        type: "string",
        description: "Message's unique ID",
        example: "123456789012345678"
      },
      content: {
        type: "string",
        description: "Raw message content",
        example: "Hello world!"
      },
      cleanContent: {
        type: "string",
        description: "Message content with resolved mentions",
        example: "Hello @User!"
      },
      createdTimestamp: {
        type: "number",
        description: "Unix timestamp of message creation",
        example: "1234567890123"
      },
      editedTimestamp: {
        type: "number",
        description: "Unix timestamp of last edit",
        example: "1234567890456"
      },
      pinned: {
        type: "boolean",
        description: "Whether message is pinned",
        example: false
      },
      system: {
        type: "boolean",
        description: "Whether message is a system message",
        example: false
      },
      tts: {
        type: "boolean",
        description: "Whether message uses text-to-speech",
        example: false
      },
      nonce: {
        type: "string",
        description: "Message nonce for validation",
        example: "123456789"
      },
      type: {
        type: "enum",
        description: "Message type",
        values: {
          DEFAULT: 0,
          RECIPIENT_ADD: 1,
          RECIPIENT_REMOVE: 2,
          CALL: 3,
          CHANNEL_NAME_CHANGE: 4,
          CHANNEL_ICON_CHANGE: 5,
          CHANNEL_PINNED_MESSAGE: 6,
          GUILD_MEMBER_JOIN: 7,
          USER_PREMIUM_GUILD_SUBSCRIPTION: 8,
          USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1: 9,
          USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2: 10,
          USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3: 11,
          CHANNEL_FOLLOW_ADD: 12,
          GUILD_DISCOVERY_DISQUALIFIED: 14,
          GUILD_DISCOVERY_REQUALIFIED: 15,
          GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16,
          GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17,
          THREAD_CREATED: 18,
          REPLY: 19,
          CHAT_INPUT_COMMAND: 20,
          THREAD_STARTER_MESSAGE: 21,
          GUILD_INVITE_REMINDER: 22,
          CONTEXT_MENU_COMMAND: 23
        }
      }
    },

    author: {
      type: "object",
      description: "User who sent the message",
      properties: {
        id: "Author's Discord ID",
        username: "Author's username",
        discriminator: "Author's discriminator",
        tag: "Author's full tag (username#discriminator)",
        avatarURL: "Author's avatar URL",
        bot: "Whether author is a bot",
        system: "Whether author is a system user",
        flags: "Author's user flags"
      }
    },

    member: {
      type: "object",
      description: "Guild member who sent the message",
      properties: {
        nickname: "Member's nickname in the guild",
        roles: "Member's roles collection",
        joinedTimestamp: "When member joined the guild",
        premiumSince: "When member started boosting",
        permissions: "Member's permissions in the channel"
      }
    },

    channel: {
      type: "object",
      description: "Channel where message was sent",
      properties: {
        id: "Channel ID",
        name: "Channel name",
        type: "Channel type",
        guild: "Guild the channel belongs to"
      }
    },

    guild: {
      type: "object",
      description: "Guild where message was sent",
      properties: {
        id: "Guild ID",
        name: "Guild name",
        iconURL: "Guild icon URL",
        memberCount: "Total member count"
      }
    },

    attachments: {
      type: "collection",
      description: "Files attached to the message",
      methods: {
        size: "Number of attachments",
        first: "Get first attachment",
        find: "Find attachment by predicate",
        forEach: "Iterate through attachments",
        map: "Map attachments to new array",
        filter: "Filter attachments by predicate"
      },
      properties: {
        id: "Attachment ID",
        filename: "File name",
        size: "File size in bytes",
        url: "File download URL",
        proxyURL: "Discord CDN proxy URL",
        height: "Image/video height",
        width: "Image/video width",
        contentType: "MIME type of the file"
      }
    },

    embeds: {
      type: "array",
      description: "Embeds in the message",
      properties: {
        title: "Embed title",
        description: "Embed description",
        color: "Embed color",
        fields: "Embed fields array",
        footer: "Embed footer",
        image: "Embed image",
        thumbnail: "Embed thumbnail",
        author: "Embed author",
        timestamp: "Embed timestamp",
        url: "Embed URL"
      }
    },

    reactions: {
      type: "collection",
      description: "Message reactions",
      methods: {
        add: "Add reaction to message",
        remove: "Remove reaction from message",
        removeAll: "Remove all reactions",
        cache: "Collection of reactions"
      },
      properties: {
        emoji: "Reaction emoji",
        count: "Number of users who reacted",
        me: "Whether bot reacted",
        users: "Collection of users who reacted"
      }
    },

    mentions: {
      type: "object",
      description: "Message mentions",
      properties: {
        users: "Collection of mentioned users",
        members: "Collection of mentioned members",
        channels: "Collection of mentioned channels",
        roles: "Collection of mentioned roles",
        everyone: "Whether @everyone was mentioned",
        here: "Whether @here was mentioned"
      }
    },

    components: {
      type: "array",
      description: "Message components (buttons, select menus, etc.)",
      properties: {
        type: "Component type",
        style: "Component style",
        label: "Component label",
        customId: "Component custom ID",
        disabled: "Whether component is disabled"
      }
    }
  },

  methods: {
    reply: {
      description: "Reply to the message",
      parameters: {
        content: "Text or embed to send",
        embeds: "Array of embeds",
        files: "Array of files",
        components: "Message components",
        allowedMentions: "Mention settings",
        ephemeral: "Whether reply is ephemeral"
      },
      example: "message.reply('Hello!')"
    },
    
    edit: {
      description: "Edit message content (bot messages only)",
      parameters: {
        content: "New content for message",
        embeds: "New embeds array",
        files: "New files array",
        components: "New components array"
      },
      example: "message.edit('Updated content')"
    },

    delete: {
      description: "Delete the message",
      parameters: {
        timeout: "Optional deletion delay in ms"
      },
      example: "message.delete()"
    },

    pin: {
      description: "Pin message to channel",
      parameters: {
        reason: "Reason for pinning"
      },
      example: "message.pin('Important announcement')"
    },

    unpin: {
      description: "Unpin message from channel",
      parameters: {
        reason: "Reason for unpinning"
      },
      example: "message.unpin('No longer relevant')"
    },

    react: {
      description: "Add a reaction to the message",
      parameters: {
        emoji: "Emoji to react with"
      },
      example: "message.react('👍')"
    },

    fetch: {
      description: "Fetch the message from Discord",
      parameters: {
        force: "Whether to skip cache"
      },
      example: "message.fetch()"
    },

    crosspost: {
      description: "Crosspost message (announcement channels only)",
      parameters: {},
      example: "message.crosspost()"
    },

    startThread: {
      description: "Start a thread from this message",
      parameters: {
        name: "Thread name",
        autoArchiveDuration: "Auto archive duration",
        reason: "Reason for creating thread"
      },
      example: "message.startThread({name: 'Discussion'})"
    },

    suppressEmbeds: {
      description: "Suppress embeds in the message",
      parameters: {
        suppress: "Whether to suppress embeds"
      },
      example: "message.suppressEmbeds(true)"
    }
  },

  events: {
    messageCreate: {
      description: "When a message is sent",
      data: "New message object"
    },
    messageDelete: {
      description: "When a message is deleted",
      data: "Deleted message object"
    },
    messageUpdate: {
      description: "When a message is edited",
      data: {
        oldMessage: "Original message",
        newMessage: "Updated message"
      }
    },
    messageReactionAdd: {
      description: "When a reaction is added",
      data: {
        reaction: "Added reaction",
        user: "User who reacted"
      }
    },
    messageReactionRemove: {
      description: "When a reaction is removed",
      data: {
        reaction: "Removed reaction",
        user: "User who removed reaction"
      }
    },
    messageReactionRemoveAll: {
      description: "When all reactions are removed",
      data: {
        message: "Message with removed reactions"
      }
    },
    messageReactionRemoveEmoji: {
      description: "When all reactions for an emoji are removed",
      data: {
        reaction: "Reaction that was removed"
      }
    }
  },

  flags: {
    CROSSPOSTED: {
      description: "Message is crossposted",
      value: 1
    },
    IS_CROSSPOST: {
      description: "Message is a crosspost",
      value: 2
    },
    SUPPRESS_EMBEDS: {
      description: "Message embeds are suppressed",
      value: 4
    },
    SOURCE_MESSAGE_DELETED: {
      description: "Source message was deleted",
      value: 8
    },
    URGENT: {
      description: "Message is urgent",
      value: 16
    },
    HAS_THREAD: {
      description: "Message has a thread",
      value: 32
    },
    EPHEMERAL: {
      description: "Message is ephemeral",
      value: 64
    },
    LOADING: {
      description: "Message is thinking/loading",
      value: 128
    },
    FAILED_TO_MENTION_ROLES: {
      description: "Failed to mention some roles",
      value: 256
    },
    SUPPRESS_NOTIFICATIONS: {
      description: "Message suppresses notifications",
      value: 4096
    },
    IS_VOICE_MESSAGE: {
      description: "Message is a voice message",
      value: 8192
    }
  },

  validators: {
    isEditable: {
      description: "Check if message can be edited by the bot",
      example: "message.editable"
    },
    isDeletable: {
      description: "Check if message can be deleted by the bot",
      example: "message.deletable"
    },
    isPinnable: {
      description: "Check if message can be pinned",
      example: "message.pinnable"
    },
    isPinned: {
      description: "Check if message is pinned",
      example: "message.pinned"
    },
    isSystem: {
      description: "Check if message is a system message",
      example: "message.system"
    },
    isCrosspostable: {
      description: "Check if message can be crossposted",
      example: "message.crosspostable"
    },
    hasThread: {
      description: "Check if message has a thread",
      example: "message.hasThread"
    },
    isPartial: {
      description: "Check if message is partial",
      example: "message.partial"
    }
  }
};