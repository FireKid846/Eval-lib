module.exports = {
  properties: {
    basic: {
      id: {
        type: "string",
        description: "Server's unique ID",
        example: "123456789012345678"
      },
      name: {
        type: "string",
        description: "Server name",
        example: "My Gaming Server"
      },
      description: {
        type: "string",
        description: "Server description",
        example: "A fun gaming community"
      },
      icon: {
        type: "string",
        description: "Server icon URL",
        methods: {
          iconURL: "Get icon URL with options",
          dynamicIconURL: "Get dynamic icon URL"
        }
      },
      banner: {
        type: "string",
        description: "Server banner URL",
        methods: {
          bannerURL: "Get banner URL with options"
        }
      },
      splash: {
        type: "string",
        description: "Server invite splash URL",
        methods: {
          splashURL: "Get splash URL with options"
        }
      },
      ownerId: {
        type: "string",
        description: "ID of the server owner",
        example: "123456789012345678"
      },
      memberCount: {
        type: "number",
        description: "Total number of members",
        example: 1250
      },
      maxMembers: {
        type: "number",
        description: "Maximum member limit",
        example: 500000
      },
      createdTimestamp: {
        type: "number",
        description: "Unix timestamp of server creation",
        example: 1234567890123
      },
      preferredLocale: {
        type: "string",
        description: "Server's preferred locale",
        example: "en-US"
      },
      afkChannelId: {
        type: "string",
        description: "AFK channel ID",
        example: "123456789012345678"
      },
      afkTimeout: {
        type: "number",
        description: "AFK timeout in seconds",
        example: 300
      },
      systemChannelId: {
        type: "string",
        description: "System messages channel ID",
        example: "123456789012345678"
      },
      rulesChannelId: {
        type: "string",
        description: "Rules channel ID",
        example: "123456789012345678"
      },
      publicUpdatesChannelId: {
        type: "string",
        description: "Public updates channel ID",
        example: "123456789012345678"
      }
    },

    features: {
      premium: {
        type: "object",
        description: "Premium server features",
        properties: {
          premiumTier: "Server boost level (0-3)",
          premiumSubscriptionCount: "Number of server boosters",
          premiumProgressBarEnabled: "Whether boost progress bar is enabled"
        }
      },
      verification: {
        type: "object",
        description: "Server verification settings",
        properties: {
          verificationLevel: "Verification level (NONE, LOW, MEDIUM, HIGH, VERY_HIGH)",
          mfaLevel: "2FA requirement level (NONE, ELEVATED)",
          explicitContentFilter: "Content filter level (DISABLED, MEMBERS_WITHOUT_ROLES, ALL_MEMBERS)",
          defaultMessageNotifications: "Default notification level"
        }
      },
      serverFeatures: {
        type: "array",
        description: "Server feature flags",
        examples: [
          "ANIMATED_BANNER",
          "ANIMATED_ICON",
          "APPLICATION_COMMAND_PERMISSIONS_V2",
          "AUTO_MODERATION",
          "BANNER",
          "COMMUNITY",
          "CREATOR_MONETIZABLE_PROVISIONAL",
          "CREATOR_STORE_PAGE",
          "DEVELOPER_SUPPORT_SERVER",
          "DISCOVERABLE",
          "FEATURABLE",
          "INVITES_DISABLED",
          "INVITE_SPLASH",
          "MEMBER_VERIFICATION_GATE_ENABLED",
          "MORE_STICKERS",
          "NEWS",
          "PARTNERED",
          "PREVIEW_ENABLED",
          "RAID_ALERTS_DISABLED",
          "ROLE_ICONS",
          "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
          "ROLE_SUBSCRIPTIONS_ENABLED",
          "TICKETED_EVENTS_ENABLED",
          "VANITY_URL",
          "VERIFIED",
          "VIP_REGIONS",
          "WELCOME_SCREEN_ENABLED"
        ]
      }
    },

    collections: {
      members: {
        type: "collection",
        description: "Server members",
        methods: {
          fetch: "Fetch member data",
          ban: "Ban member from server",
          unban: "Unban member from server",
          kick: "Kick member from server",
          prune: "Prune inactive members",
          search: "Search members by query"
        },
        properties: {
          cache: "Cached members collection",
          me: "Bot's member object"
        }
      },
      channels: {
        type: "collection",
        description: "Server channels",
        methods: {
          create: "Create new channel",
          fetch: "Fetch channel data",
          resolve: "Resolve channel by ID or object"
        },
        properties: {
          cache: "Cached channels collection"
        }
      },
      roles: {
        type: "collection",
        description: "Server roles",
        methods: {
          create: "Create new role",
          fetch: "Fetch role data",
          resolve: "Resolve role by ID or object"
        },
        properties: {
          cache: "Cached roles collection",
          everyone: "The @everyone role"
        }
      },
      emojis: {
        type: "collection",
        description: "Server custom emojis",
        methods: {
          create: "Create custom emoji",
          fetch: "Fetch emoji data",
          resolve: "Resolve emoji by ID or object"
        },
        properties: {
          cache: "Cached emojis collection"
        }
      },
      stickers: {
        type: "collection",
        description: "Server custom stickers",
        methods: {
          create: "Create custom sticker",
          fetch: "Fetch sticker data",
          resolve: "Resolve sticker by ID or object"
        },
        properties: {
          cache: "Cached stickers collection"
        }
      }
    },

    methods: {
      bans: {
        description: "Manage server bans",
        methods: {
          fetch: "Get server bans list",
          create: "Ban user from server",
          remove: "Unban user from server"
        },
        example: "guild.bans.fetch()"
      },
      invites: {
        description: "Manage server invites",
        methods: {
          create: "Create server invite",
          fetch: "Get server invites",
          delete: "Delete invite"
        },
        example: "guild.invites.fetch()"
      },
      webhooks: {
        description: "Manage server webhooks",
        methods: {
          create: "Create webhook",
          fetch: "Get webhooks",
          fetchMessage: "Fetch webhook message"
        },
        example: "guild.fetchWebhooks()"
      },
      templates: {
        description: "Manage server templates",
        methods: {
          create: "Create server template",
          fetch: "Get server templates",
          sync: "Sync template with current server"
        },
        example: "guild.fetchTemplates()"
      },
      audit: {
        description: "Server audit log operations",
        methods: {
          fetchAuditLogs: "Fetch audit log entries"
        },
        example: "guild.fetchAuditLogs()"
      },
      vanity: {
        description: "Vanity URL operations",
        methods: {
          fetchVanityData: "Get vanity URL data",
          setVanityCode: "Set vanity URL code"
        },
        example: "guild.fetchVanityData()"
      },
      widget: {
        description: "Server widget operations",
        methods: {
          fetchWidget: "Get widget data",
          fetchWidgetSettings: "Get widget settings"
        },
        example: "guild.fetchWidget()"
      }
    },

    events: {
      guildCreate: {
        description: "Bot joins a server",
        data: "Guild object"
      },
      guildDelete: {
        description: "Bot leaves a server or server is deleted",
        data: "Guild object"
      },
      guildUpdate: {
        description: "Server settings are updated",
        data: {
          oldGuild: "Previous guild state",
          newGuild: "Updated guild state"
        }
      },
      guildMemberAdd: {
        description: "Member joins server",
        data: "GuildMember object"
      },
      guildMemberRemove: {
        description: "Member leaves server",
        data: "GuildMember object"
      },
      guildMemberUpdate: {
        description: "Member is updated",
        data: {
          oldMember: "Previous member state",
          newMember: "Updated member state"
        }
      },
      roleCreate: {
        description: "Role is created",
        data: "Role object"
      },
      roleDelete: {
        description: "Role is deleted",
        data: "Role object"
      },
      roleUpdate: {
        description: "Role is updated",
        data: {
          oldRole: "Previous role state",
          newRole: "Updated role state"
        }
      },
      channelCreate: {
        description: "Channel is created",
        data: "Channel object"
      },
      channelDelete: {
        description: "Channel is deleted",
        data: "Channel object"
      },
      channelUpdate: {
        description: "Channel is updated",
        data: {
          oldChannel: "Previous channel state",
          newChannel: "Updated channel state"
        }
      },
      emojiCreate: {
        description: "Custom emoji is created",
        data: "GuildEmoji object"
      },
      emojiDelete: {
        description: "Custom emoji is deleted",
        data: "GuildEmoji object"
      },
      emojiUpdate: {
        description: "Custom emoji is updated",
        data: {
          oldEmoji: "Previous emoji state",
          newEmoji: "Updated emoji state"
        }
      },
      stickerCreate: {
        description: "Custom sticker is created",
        data: "Sticker object"
      },
      stickerDelete: {
        description: "Custom sticker is deleted",
        data: "Sticker object"
      },
      stickerUpdate: {
        description: "Custom sticker is updated",
        data: {
          oldSticker: "Previous sticker state",
          newSticker: "Updated sticker state"
        }
      },
      guildBanAdd: {
        description: "User is banned from server",
        data: "GuildBan object"
      },
      guildBanRemove: {
        description: "User is unbanned from server",
        data: "GuildBan object"
      },
      guildIntegrationsUpdate: {
        description: "Server integrations are updated",
        data: "Guild object"
      },
      webhookUpdate: {
        description: "Server webhooks are updated",
        data: "Channel object"
      }
    },

    permissions: {
      general: {
        description: "General server permissions",
        permissions: [
          "VIEW_CHANNEL",
          "MANAGE_CHANNELS",
          "MANAGE_ROLES",
          "MANAGE_GUILD",
          "VIEW_AUDIT_LOG",
          "VIEW_GUILD_INSIGHTS",
          "MANAGE_WEBHOOKS",
          "MANAGE_GUILD_EXPRESSIONS"
        ]
      },
      membership: {
        description: "Member management permissions",
        permissions: [
          "CREATE_INSTANT_INVITE",
          "KICK_MEMBERS",
          "BAN_MEMBERS",
          "MANAGE_NICKNAMES",
          "CHANGE_NICKNAME"
        ]
      },
      text: {
        description: "Text channel permissions",
        permissions: [
          "SEND_MESSAGES",
          "SEND_TTS_MESSAGES",
          "MANAGE_MESSAGES",
          "EMBED_LINKS",
          "ATTACH_FILES",
          "READ_MESSAGE_HISTORY",
          "MENTION_EVERYONE",
          "USE_EXTERNAL_EMOJIS",
          "ADD_REACTIONS",
          "USE_SLASH_COMMANDS",
          "MANAGE_THREADS",
          "CREATE_PUBLIC_THREADS",
          "CREATE_PRIVATE_THREADS",
          "USE_EXTERNAL_STICKERS",
          "SEND_MESSAGES_IN_THREADS"
        ]
      },
      voice: {
        description: "Voice channel permissions",
        permissions: [
          "CONNECT",
          "SPEAK",
          "STREAM",
          "USE_VAD",
          "PRIORITY_SPEAKER",
          "MUTE_MEMBERS",
          "DEAFEN_MEMBERS",
          "MOVE_MEMBERS",
          "REQUEST_TO_SPEAK"
        ]
      },
      advanced: {
        description: "Advanced permissions",
        permissions: [
          "ADMINISTRATOR",
          "MANAGE_EVENTS",
          "MODERATE_MEMBERS",
          "USE_APPLICATION_COMMANDS"
        ]
      }
    },

    validators: {
      isAvailable: {
        description: "Check if guild is available",
        example: "guild.available"
      },
      isLarge: {
        description: "Check if guild is considered large",
        example: "guild.large"
      },
      isOwner: {
        description: "Check if bot is guild owner",
        example: "guild.ownerId === client.user.id"
      },
      isPartnered: {
        description: "Check if guild is Discord partnered",
        example: "guild.features.includes('PARTNERED')"
      },
      isVerified: {
        description: "Check if guild is Discord verified",
        example: "guild.features.includes('VERIFIED')"
      },
      hasFeature: {
        description: "Check if guild has specific feature",
        example: "guild.features.includes('COMMUNITY')"
      },
      isDiscoverable: {
        description: "Check if guild is discoverable",
        example: "guild.features.includes('DISCOVERABLE')"
      },
      hasVanityURL: {
        description: "Check if guild has vanity URL",
        example: "guild.features.includes('VANITY_URL')"
      }
    }
  }
};