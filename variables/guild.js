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
        description: "Server's name",
        example: "My Cool Server"
      },
      description: {
        type: "string",
        description: "Server description",
        example: "A great place to hang out"
      },
      memberCount: {
        type: "number",
        description: "Total number of members",
        example: "1000"
      }
    },
    
    appearance: {
      icon: {
        type: "string",
        description: "Server icon URL",
        methods: ["getURL()", "fetch()"]
      },
      banner: {
        type: "string",
        description: "Server banner URL",
        methods: ["getURL()", "fetch()"]
      },
      splash: {
        type: "string",
        description: "Server invite splash URL",
        methods: ["getURL()", "fetch()"]
      }
    },
    
    collections: {
      members: {
        type: "collection",
        description: "Server members",
        methods: [
          "fetch(id)",
          "cache.get(id)",
          "cache.find(predicate)",
          "cache.filter(predicate)"
        ]
      },
      channels: {
        type: "collection",
        description: "Server channels",
        methods: [
          "create(options)",
          "cache.get(id)",
          "cache.find(predicate)",
          "fetch(id)"
        ]
      },
      roles: {
        type: "collection",
        description: "Server roles",
        methods: [
          "create(options)",
          "cache.get(id)",
          "cache.find(predicate)",
          "fetch(id)"
        ]
      },
      emojis: {
        type: "collection",
        description: "Server emojis",
        methods: [
          "create(options)",
          "cache.get(id)",
          "cache.find(predicate)"
        ]
      }
    },

    methods: {
      moderation: {
        ban: {
          description: "Ban a user from the server",
          parameters: {
            user: "User to ban",
            reason: "Reason for ban",
            deleteMessageDays: "Days of messages to delete"
          },
          example: "guild.members.ban('userId', {reason: 'Rule violation', deleteMessageDays: 7})"
        },
        unban: {
          description: "Unban a user",
          parameters: {
            user: "User to unban",
            reason: "Reason for unban"
          },
          example: "guild.members.unban('userId', 'Forgiven')"
        },
        fetchBan: {
          description: "Get ban information",
          parameters: {
            user: "User to check"
          },
          example: "guild.bans.fetch('userId')"
        }
      },
      
      management: {
        setName: {
          description: "Change server name",
          parameters: {
            name: "New server name"
          },
          example: "guild.setName('New Server Name')"
        },
        setIcon: {
          description: "Change server icon",
          parameters: {
            icon: "New icon URL or buffer"
          },
          example: "guild.setIcon('icon.png')"
        },
        setVerificationLevel: {
          description: "Set verification level",
          parameters: {
            level: "New verification level"
          },
          example: "guild.setVerificationLevel(1)"
        }
      }
    },

    events: {
      guildMemberAdd: "Member joins server",
      guildMemberRemove: "Member leaves server",
      guildBanAdd: "Member is banned",
      guildBanRemove: "Member is unbanned",
      guildUpdate: "Server settings updated",
      roleCreate: "Role is created",
      roleDelete: "Role is deleted",
      channelCreate: "Channel is created",
      channelDelete: "Channel is deleted"
    },

    permissions: {
      general: [
        "VIEW_CHANNEL",
        "MANAGE_CHANNELS",
        "MANAGE_ROLES",
        "MANAGE_GUILD",
        "VIEW_AUDIT_LOG"
      ],
      text: [
        "SEND_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MANAGE_MESSAGES"
      ],
      voice: [
        "CONNECT",
        "SPEAK",
        "STREAM",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS"
      ],
      advanced: [
        "ADMINISTRATOR",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MENTION_EVERYONE"
      ]
    }
  }
};
