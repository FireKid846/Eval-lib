const codeGenerator = require('./codeGenerator');
const formatter = require('./formatter');
const Command = require('../models/Command');
const Variable = require('../models/Variable');

class CommandBuilder {
  constructor() {
    this.supportedTypes = ['slash', 'message', 'button', 'modal'];
    this.cache = new Map();
  }

  async createCommand(formData) {
    try {
      const validatedData = await this.validateFormData(formData);
      const generatedCode = await this.generateCommandCode(validatedData);
      const formattedCode = formatter.format(generatedCode);
      
      const command = new Command({
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type,
        code: formattedCode,
        variables: validatedData.variables,
        options: validatedData.options,
        template: validatedData.template,
        permissions: validatedData.permissions
      });

      await command.save();
      this.cache.set(command.name, command);
      
      return {
        success: true,
        command: command,
        code: formattedCode
      };
    } catch (error) {
      console.error('Command creation error:', error);
      throw new Error(`Failed to create command: ${error.message}`);
    }
  }

  async validateFormData(formData) {
    const { name, type, template } = formData;

    if (!name || !name.match(/^[\w-]{1,32}$/)) {
      throw new Error('Invalid command name. Use 1-32 characters, letters, numbers, underscores only.');
    }

    if (!this.supportedTypes.includes(type)) {
      throw new Error(`Unsupported command type. Use: ${this.supportedTypes.join(', ')}`);
    }

    if (template) {
      const templateExists = await this.checkTemplateExists(template);
      if (!templateExists) {
        throw new Error(`Template '${template}' not found`);
      }
    }

    return formData;
  }

  async generateCommandCode(data) {
    try {
      const command = codeGenerator.generateCommand(data);
      return command.code;
    } catch (error) {
      throw new Error(`Code generation failed: ${error.message}`);
    }
  }

  async getAvailableVariables(category = null) {
    try {
      const query = category ? { category } : {};
      const variables = await Variable.find(query).select('-__v');
      return variables;
    } catch (error) {
      throw new Error(`Failed to fetch variables: ${error.message}`);
    }
  }

  async checkTemplateExists(templateName) {
    const templates = await this.getTemplates();
    return templates.some(t => t.name === templateName);
  }

  async getTemplates() {
    try {
      const templates = await import('../templates').then(m => m.default);
      return Object.values(templates);
    } catch (error) {
      throw new Error(`Failed to load templates: ${error.message}`);
    }
  }

  async getCommand(name) {
    if (this.cache.has(name)) {
      return this.cache.get(name);
    }

    const command = await Command.findOne({ name });
    if (command) {
      this.cache.set(name, command);
    }
    
    return command;
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new CommandBuilder();
