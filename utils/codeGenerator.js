const discordVars = require('../variables/discord.js');
const fs = require('fs').promises;
const path = require('path');

class CodeGenerator {
  constructor() {
    this.templates = new Map();
    this.loadTemplates();
  }

  async loadTemplates() {
    const templateDir = path.join(__dirname, '../templates');
    const files = await fs.readdir(templateDir);
    
    for (const file of files) {
      const templateName = path.basename(file, '.js');
      const template = require(path.join(templateDir, file));
      this.templates.set(templateName, template);
    }
  }

  generateCommand(formData) {
    const {
      name,
      description,
      template,
      content,
      permissions,
      options,
      triggerType,
      responseType,
      conditions,
      variables,
      actions
    } = formData;

    let code = '';
    let commandStructure = {};

    switch (triggerType) {
      case 'slash':
        commandStructure = this.generateSlashCommand(formData);
        break;
      case 'message':
        commandStructure = this.generateMessageCommand(formData);
        break;
      case 'button':
        commandStructure = this.generateButtonCommand(formData);
        break;
      case 'modal':
        commandStructure = this.generateModalCommand(formData);
        break;
    }

    code = this.buildExecutableCode(commandStructure, formData);

    return {
      name,
      description,
      type: triggerType,
      permissions: permissions || [],
      code,
      options: options || [],
      cooldown: formData.cooldown || 0,
      category: template,
      createdAt: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  generateSlashCommand(data) {
    const { name, description, options } = data;
    
    return {
      name,
      description,
      options: this.processCommandOptions(options),
      execute: this.generateExecuteFunction(data)
    };
  }

  generateMessageCommand(data) {
    const { name, content, conditions } = data;
    
    return {
      name,
      trigger: 'messageCreate',
      conditions: this.processConditions(conditions),
      execute: this.generateExecuteFunction(data)
    };
  }

  generateButtonCommand(data) {
    const { name, customId } = data;
    
    return {
      name,
      customId: customId || name,
      execute: this.generateExecuteFunction(data)
    };
  }

  generateModalCommand(data) {
    const { name, customId, fields } = data;
    
    return {
      name,
      customId: customId || name,
      fields: this.processModalFields(fields),
      execute: this.generateExecuteFunction(data)
    };
  }

  generateExecuteFunction(data) {
    const { template, content, actions, conditions, responseType } = data;
    
    let functionBody = '';
    
    if (template && this.templates.has(template)) {
      const templateCode = this.templates.get(template);
      functionBody = templateCode.generate(data);
    } else {
      functionBody = this.generateCustomLogic(data);
    }

    return functionBody;
  }

  generateCustomLogic(data) {
    const { content, actions, conditions, responseType } = data;
    let code = '';

    if (conditions && conditions.length > 0) {
      code += this.generateConditions(conditions);
      code += '{\n';
    }

    if (actions && actions.length > 0) {
      for (const action of actions) {
        code += this.generateAction(action);
      }
    } else {
      code += this.generateResponse(content, responseType);
    }

    if (conditions && conditions.length > 0) {
      code += '}\n';
    }

    return code;
  }

  generateConditions(conditions) {
    let code = 'if (';
    
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      code += this.processCondition(condition);
      
      if (i < conditions.length - 1) {
        code += ` ${condition.operator || '&&'} `;
      }
    }
    
    code += ') ';
    return code;
  }

  processCondition(condition) {
    const { variable, operator, value, type } = condition;
    
    let processedValue = value;
    if (type === 'string') {
      processedValue = `'${value}'`;
    }

    switch (operator) {
      case 'equals':
        return `${variable} === ${processedValue}`;
      case 'contains':
        return `${variable}.includes(${processedValue})`;
      case 'startsWith':
        return `${variable}.startsWith(${processedValue})`;
      case 'endsWith':
        return `${variable}.endsWith(${processedValue})`;
      case 'greaterThan':
        return `${variable} > ${processedValue}`;
      case 'lessThan':
        return `${variable} < ${processedValue}`;
      case 'exists':
        return `${variable}`;
      case 'notExists':
        return `!${variable}`;
      default:
        return `${variable} ${operator} ${processedValue}`;
    }
  }

  generateAction(action) {
    const { type, target, value, parameters } = action;
    
    switch (type) {
      case 'reply':
        return `await ${target || 'interaction'}.reply(${this.formatValue(value)});\n`;
      case 'send':
        return `await ${target || 'channel'}.send(${this.formatValue(value)});\n`;
      case 'edit':
        return `await ${target}.edit(${this.formatValue(value)});\n`;
      case 'delete':
        return `await ${target}.delete();\n`;
      case 'kick':
        return `await ${target}.kick(${this.formatValue(parameters?.reason)});\n`;
      case 'ban':
        return `await ${target}.ban({reason: ${this.formatValue(parameters?.reason)}, deleteMessageDays: ${parameters?.deleteMessageDays || 0}});\n`;
      case 'timeout':
        return `await ${target}.timeout(${parameters?.duration || 60000}, ${this.formatValue(parameters?.reason)});\n`;
      case 'addRole':
        return `await ${target}.roles.add('${parameters?.roleId}');\n`;
      case 'removeRole':
        return `await ${target}.roles.remove('${parameters?.roleId}');\n`;
      case 'react':
        return `await ${target}.react('${parameters?.emoji}');\n`;
      case 'createChannel':
        return `await guild.channels.create({name: ${this.formatValue(parameters?.name)}, type: ${parameters?.type}});\n`;
      case 'createRole':
        return `await guild.roles.create({name: ${this.formatValue(parameters?.name)}, color: '${parameters?.color}'});\n`;
      case 'log':
        return `console.log(${this.formatValue(value)});\n`;
      case 'wait':
        return `await new Promise(resolve => setTimeout(resolve, ${parameters?.duration || 1000}));\n`;
      case 'random':
        return `const randomNum = Math.floor(Math.random() * ${parameters?.max || 100}) + ${parameters?.min || 1};\n`;
      default:
        return `${type}(${this.formatValue(value)});\n`;
    }
  }

  generateResponse(content, responseType) {
    const processedContent = this.processVariables(content);
    
    switch (responseType) {
      case 'reply':
        return `await interaction.reply(${this.formatValue(processedContent)});\n`;
      case 'send':
        return `await channel.send(${this.formatValue(processedContent)});\n`;
      case 'embed':
        return this.generateEmbedResponse(processedContent);
      case 'dm':
        return `await interaction.user.send(${this.formatValue(processedContent)});\n`;
      default:
        return `await interaction.reply(${this.formatValue(processedContent)});\n`;
    }
  }

  generateEmbedResponse(content) {
    const embed = this.parseEmbedContent(content);
    let code = 'const { EmbedBuilder } = require("discord.js");\n';
    code += 'const embed = new EmbedBuilder()\n';
    
    if (embed.title) code += `.setTitle(${this.formatValue(embed.title)})\n`;
    if (embed.description) code += `.setDescription(${this.formatValue(embed.description)})\n`;
    if (embed.color) code += `.setColor('${embed.color}')\n`;
    if (embed.footer) code += `.setFooter({text: ${this.formatValue(embed.footer)}})\n`;
    if (embed.image) code += `.setImage(${this.formatValue(embed.image)})\n`;
    if (embed.thumbnail) code += `.setThumbnail(${this.formatValue(embed.thumbnail)})\n`;
    
    code += ';\nawait interaction.reply({embeds: [embed]});\n';
    return code;
  }

  parseEmbedContent(content) {
    const embed = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('title:')) embed.title = line.substring(6).trim();
      if (line.startsWith('description:')) embed.description = line.substring(12).trim();
      if (line.startsWith('color:')) embed.color = line.substring(6).trim();
      if (line.startsWith('footer:')) embed.footer = line.substring(7).trim();
      if (line.startsWith('image:')) embed.image = line.substring(6).trim();
      if (line.startsWith('thumbnail:')) embed.thumbnail = line.substring(10).trim();
    }
    
    return embed;
  }

  processVariables(content) {
    if (!content) return content;
    
    let processed = content;
    const variableRegex = /\{([^}]+)\}/g;
    
    processed = processed.replace(variableRegex, (match, variable) => {
      if (this.isValidVariable(variable)) {
        return '${' + variable + '}';
      }
      return match;
    });
    
    return processed;
  }

  isValidVariable(variable) {
    const allVars = [
      ...Object.keys(discordVars.objects.interaction?.properties || {}),
      ...Object.keys(discordVars.objects.message?.properties || {}),
      ...Object.keys(discordVars.objects.guild?.properties || {}),
      ...Object.keys(discordVars.objects.member?.properties || {}),
      ...Object.keys(discordVars.objects.channel?.properties || {}),
      ...Object.keys(discordVars.objects.user?.properties || {}),
      ...Object.keys(discordVars.utilities || {}),
      ...Object.keys(discordVars.methods || {})
    ];
    
    return allVars.includes(variable);
  }

  processCommandOptions(options) {
    if (!options) return [];
    
    return options.map(option => ({
      name: option.name,
      description: option.description,
      type: this.getOptionType(option.type),
      required: option.required || false,
      choices: option.choices || undefined
    }));
  }

  getOptionType(type) {
    const types = {
      'string': 3,
      'integer': 4,
      'boolean': 5,
      'user': 6,
      'channel': 7,
      'role': 8,
      'mentionable': 9,
      'number': 10,
      'attachment': 11
    };
    return types[type] || 3;
  }

  processModalFields(fields) {
    if (!fields) return [];
    
    return fields.map(field => ({
      customId: field.customId,
      label: field.label,
      style: field.style || 'Short',
      required: field.required || false,
      placeholder: field.placeholder,
      maxLength: field.maxLength,
      minLength: field.minLength
    }));
  }

  formatValue(value) {
    if (!value) return "''";
    if (typeof value === 'string' && !value.startsWith('`') && !value.includes('${')) {
      return `'${value.replace(/'/g, "\\'")}'`;
    }
    if (typeof value === 'string' && value.includes('${')) {
      return '`' + value + '`';
    }
    return value;
  }

  buildExecutableCode(structure, data) {
    const { triggerType } = data;
    let code = '';

    switch (triggerType) {
      case 'slash':
        code = this.buildSlashCommandCode(structure);
        break;
      case 'message':
        code = this.buildMessageCommandCode(structure);
        break;
      case 'button':
        code = this.buildButtonCommandCode(structure);
        break;
      case 'modal':
        code = this.buildModalCommandCode(structure);
        break;
    }

    return this.validateAndCleanCode(code);
  }

  buildSlashCommandCode(structure) {
    return `module.exports = {
  data: {
    name: '${structure.name}',
    description: '${structure.description}',
    options: ${JSON.stringify(structure.options, null, 2)}
  },
  async execute(interaction) {
    try {
      ${structure.execute}
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({content: 'An error occurred!', ephemeral: true});
      } else {
        await interaction.reply({content: 'An error occurred!', ephemeral: true});
      }
    }
  }
};`;
  }

  buildMessageCommandCode(structure) {
    return `module.exports = {
  name: '${structure.name}',
  trigger: '${structure.trigger}',
  async execute(message) {
    try {
      const content = message.content.toLowerCase();
      const author = message.author;
      const guild = message.guild;
      const channel = message.channel;
      const member = message.member;
      
      ${structure.execute}
    } catch (error) {
      console.error(error);
      await message.reply('An error occurred!').catch(() => {});
    }
  }
};`;
  }

  buildButtonCommandCode(structure) {
    return `module.exports = {
  customId: '${structure.customId}',
  async execute(interaction) {
    try {
      ${structure.execute}
    } catch (error) {
      console.error(error);
      await interaction.reply({content: 'An error occurred!', ephemeral: true});
    }
  }
};`;
  }

  buildModalCommandCode(structure) {
    return `module.exports = {
  customId: '${structure.customId}',
  async execute(interaction) {
    try {
      ${structure.execute}
    } catch (error) {
      console.error(error);
      await interaction.reply({content: 'An error occurred!', ephemeral: true});
    }
  }
};`;
  }

  validateAndCleanCode(code) {
    code = code.replace(/\n\s*\n/g, '\n');
    code = code.replace(/^\s+/gm, (match) => match.replace(/\s/g, '  '));
    return code;
  }

  generateFromTemplate(templateName, data) {
    if (!this.templates.has(templateName)) {
      throw new Error(`Template ${templateName} not found`);
    }
    
    const template = this.templates.get(templateName);
    return template.generate(data);
  }
}

module.exports = new CodeGenerator();