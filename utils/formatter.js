const prettier = require('prettier');

class CodeFormatter {
  constructor() {
    this.indentSize = 2;
    this.maxLineLength = 80;
  }

  format(code, type = 'discord-command') {
    try {
      let formatted = this.preProcess(code);
      formatted = this.formatByType(formatted, type);
      formatted = this.postProcess(formatted);
      
      return prettier.format(formatted, {
        parser: 'babel',
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        arrowParens: 'avoid',
        printWidth: this.maxLineLength
      });
    } catch (error) {
      console.error('Formatting error:', error);
      return code;
    }
  }

  preProcess(code) {
    return code
      .replace(/\r\n/g, '\n')
      .replace(/\t/g, ' '.repeat(this.indentSize))
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n');
  }

  formatByType(code, type) {
    switch (type) {
      case 'discord-command':
        return this.formatDiscordCommand(code);
      case 'event-handler':
        return this.formatEventHandler(code);
      case 'modal':
        return this.formatModal(code);
      default:
        return code;
    }
  }

  formatDiscordCommand(code) {
    const commandStructure = this.extractCommandStructure(code);
    return `module.exports = {
  ${this.formatObjectProperties(commandStructure)}
};`;
  }

  formatEventHandler(code) {
    return `module.exports = {
  name: '${this.extractEventName(code)}',
  once: ${this.extractEventOptions(code).once || false},
  execute: ${this.formatFunction(this.extractEventFunction(code))}
};`;
  }

  formatModal(code) {
    return `module.exports = {
  customId: '${this.extractModalId(code)}',
  execute: ${this.formatFunction(this.extractModalFunction(code))}
};`;
  }

  extractCommandStructure(code) {
    const structure = {};
    const matches = {
      data: /data:\s*{([^}]*)}/s,
      execute: /execute[:\s]+async?\s*function\s*\([^)]*\)\s*{([^}]*)}/s
    };

    for (const [key, regex] of Object.entries(matches)) {
      const match = code.match(regex);
      if (match) {
        structure[key] = match[1].trim();
      }
    }

    return structure;
  }

  formatObjectProperties(obj) {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (key === 'execute') {
          return `${key}: ${this.formatFunction(value)}`;
        }
        return `${key}: ${value}`;
      })
      .join(',\n\n');
  }

  formatFunction(code) {
    return `async function(interaction) {
    try {
      ${this.indentCode(code.trim(), 6)}
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred!', ephemeral: true });
    }
  }`;
  }

  indentCode(code, spaces) {
    return code
      .split('\n')
      .map(line => ' '.repeat(spaces) + line)
      .join('\n');
  }

  postProcess(code) {
    return code
      .replace(/\n{3,}/g, '\n\n')
      .replace(/{\s*\n\s*}/g, '{}')
      .replace(/\[\s*\n\s*\]/g, '[]')
      .trim();
  }

  escapeStrings(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/`/g, '\\`');
  }

  extractEventName(code) {
    const match = code.match(/name:\s*['"]([^'"]*)['"]/);
    return match ? match[1] : '';
  }

  extractEventOptions(code) {
    const options = {};
    const match = code.match(/once:\s*(true|false)/);
    if (match) {
      options.once = match[1] === 'true';
    }
    return options;
  }

  extractEventFunction(code) {
    const match = code.match(/execute[:\s]+async?\s*function\s*\([^)]*\)\s*{([^}]*)}/s);
    return match ? match[1].trim() : '';
  }

  extractModalId(code) {
    const match = code.match(/customId:\s*['"]([^'"]*)['"]/);
    return match ? match[1] : '';
  }

  extractModalFunction(code) {
    const match = code.match(/execute[:\s]+async?\s*function\s*\([^)]*\)\s*{([^}]*)}/s);
    return match ? match[1].trim() : '';
  }
}

module.exports = new CodeFormatter();
