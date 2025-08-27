module.exports = {
  properties: {
    basic: {
      id: {
        type: "string",
        description: "User's Discord ID",
        example: "123456789012345678"
      },
      username: {
        type: "string",
        description: "User's display name",
        example: "CoolUser123"
      },
      tag: {
        type: "string",
        description: "User's full Discord tag",
        example: "CoolUser123#1234"
      },
      bot: {
        type: "boolean",
        description: "Whether user is a bot",
        example: "false"
      },
      system: {
        type: "boolean",
        description: "Whether user is a system user",
        example: "false"
      }
    },

    appearance: {
      avatar: {
        type: "string",
        description: "User's avatar URL",
        methods: {
          getURL: "Get avatar URL with options",
          default: "Get default avatar URL"
        }
      },
      banner: {
        type: "string",
        description: "User's profile banner",
        methods: {
          getURL: "Get banner URL with options"
        }
      },
      accentColor: {
        type: "number",
        description: "User's profile accent color",
        example: "0xFF0000"
      }
    },

    methods: {
      send: {
        description: "Send DM to user",
        parameters: {
          content: "Message content",
          embeds: "Array of embeds",
          files: "Array of files"
        },
        example: "user.send('Hello!')"
      },
      createDM: {
        description: "Create DM channel",
        parameters: {},
        example: "user.createDM()"
      },
      fetch: {
        description: "Fetch user data",
        parameters: {},
        example: "user.fetch()"
      }
    },

    flags: {
      DISCORD_EMPLOYEE: "Discord employee",
      PARTNERED_SERVER_OWNER: "Partnered server owner",
      HYPESQUAD_EVENTS: "HypeSquad events member",
      BUGHUNTER_LEVEL_1: "Bug hunter level 1",
      HOUSE_BRAVERY: "HypeSquad Bravery",
      HOUSE_BRILLIANCE: "HypeSquad Brilliance",
      HOUSE_BALANCE: "HypeSquad Balance",
      EARLY_SUPPORTER: "Early supporter",
      TEAM_USER: "Team user",
      SYSTEM: "System user",
      VERIFIED_BOT: "Verified bot",
      EARLY_VERIFIED_BOT_DEVELOPER: "Early verified bot developer"
    }
  },

  validators: {
    isBot: {
      description: "Check if user is a bot",
      syntax: "user.bot",
      example: "if (user.bot) return;"
    },
    isSystem: {
      description: "Check if system user",
      syntax: "user.system",
      example: "if (user.system) return;"
    },
    inGuild: {
      description: "Check if user is in specific guild",
      syntax: "guild.members.cache.has(user.id)",
      example: "if (guild.members.cache.has(user.id))"
    },
    hasPermission: {
      description: "Check user permissions in guild",
      syntax: "member.permissions.has(permission)",
      example: "if (member.permissions.has('ADMINISTRATOR'))"
    }
  },

  utilities: {
    getMember: {
      description: "Get member object from user in guild",
      syntax: "guild.members.cache.get(user.id)",
      example: "const member = guild.members.cache.get(user.id)"
    },
    getRoles: {
      description: "Get user's roles in guild",
      syntax: "member.roles.cache",
      example: "const roles = member.roles.cache"
    },
    getPermissions: {
      description: "Get user's permissions in guild",
      syntax: "member.permissions",
      example: "const perms = member.permissions"
    },
    getActivity: {
      description: "Get user's current activity",
      syntax: "member.presence?.activities[0]",
      example: "const activity = member.presence?.activities[0]"
    }
  },

  filters: {
    byUsername: {
      description: "Filter users by username",
      syntax: "users.filter(u => u.username.includes(search))",
      example: "const matches = users.filter(u => u.username.includes('Cool'))"
    },
    byRole: {
      description: "Filter users by role",
      syntax: "members.filter(m => m.roles.cache.has(roleId))",
      example: "const admins = members.filter(m => m.roles.cache.has('adminRoleId'))"
    },
    byPermission: {
      description: "Filter users by permission",
      syntax: "members.filter(m => m.permissions.has(permission))",
      example: "const moderators = members.filter(m => m.permissions.has('MANAGE_MESSAGES'))"
    },
    byStatus: {
      description: "Filter users by status",
      syntax: "members.filter(m => m.presence?.status === status)",
      example: "const online = members.filter(m => m.presence?.status === 'online')"
    }
  }
};