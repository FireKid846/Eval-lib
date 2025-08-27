class Variable {
  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.category = data.category;
    this.description = data.description;
    this.defaultValue = data.defaultValue;
    this.allowedValues = data.allowedValues || [];
    this.isRequired = data.isRequired || false;
    this.permissions = data.permissions || [];
    this.examples = data.examples || [];
    this.metadata = {
      isDiscordObject: data.metadata?.isDiscordObject || false,
      properties: data.metadata?.properties || [],
      methods: data.metadata?.methods || []
    };
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static getTypes() {
    return [
      'string',
      'number',
      'boolean',
      'user',
      'channel',
      'role',
      'array',
      'object'
    ];
  }

  static getCategories() {
    return [
      'discord',
      'user',
      'server',
      'channel',
      'message',
      'custom'
    ];
  }

  validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Variable name is required and must be a string');
    }

    if (!Variable.getTypes().includes(this.type)) {
      throw new Error('Invalid variable type');
    }

    if (!Variable.getCategories().includes(this.category)) {
      throw new Error('Invalid variable category');
    }

    if (!this.description || typeof this.description !== 'string') {
      throw new Error('Variable description is required and must be a string');
    }

    return true;
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      category: this.category,
      description: this.description,
      defaultValue: this.defaultValue,
      allowedValues: this.allowedValues,
      isRequired: this.isRequired,
      permissions: this.permissions,
      examples: this.examples,
      metadata: this.metadata,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(json) {
    return new Variable(json);
  }
}

module.exports = Variable;
