class Validator {
  validateCommand(data) {
    const errors = [];

    if (!this.validateName(data.name)) {
      errors.push('Invalid command name. Use 1-32 characters, letters, numbers, underscores only.');
    }

    if (!this.validateDescription(data.description)) {
      errors.push('Description must be between 1 and 100 characters.');
    }

    if (!this.validateType(data.type)) {
      errors.push('Invalid command type. Must be: slash, message, button, or modal.');
    }

    if (data.options && !this.validateOptions(data.options)) {
      errors.push('Invalid command options format.');
    }

    if (data.permissions && !this.validatePermissions(data.permissions)) {
      errors.push('Invalid permissions format.');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    return data;
  }

  validateName(name) {
    return name && /^[\w-]{1,32}$/.test(name);
  }

  validateDescription(description) {
    return description && description.length >= 1 && description.length <= 100;
  }

  validateType(type) {
    return ['slash', 'message', 'button', 'modal'].includes(type);
  }

  validateOptions(options) {
    if (!Array.isArray(options)) return false;
    
    return options.every(option => {
      return option.name 
        && option.description
        && this.validateOptionType(option.type);
    });
  }

  validateOptionType(type) {
    const validTypes = [
      'string', 'integer', 'boolean', 'user',
      'channel', 'role', 'mentionable', 'number'
    ];
    return validTypes.includes(type);
  }

  validatePermissions(permissions) {
    if (!Array.isArray(permissions)) return false;
    
    const validPermissions = [
      'ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES',
      'MANAGE_CHANNELS', 'KICK_MEMBERS', 'BAN_MEMBERS',
      'MANAGE_MESSAGES', 'SEND_MESSAGES', 'VIEW_CHANNEL'
    ];

    return permissions.every(perm => validPermissions.includes(perm));
  }
}

module.exports = new Validator();
