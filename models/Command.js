const { Octokit } = require('@octokit/rest');
const path = require('path');

class Command {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.code = data.code;
    this.variables = data.variables || [];
    this.permissions = data.permissions || [];
    this.options = data.options || [];
    this.template = data.template;
    this.cooldown = data.cooldown || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  validate() {
    if (!this.name || !this.name.match(/^[\w-]{1,32}$/)) {
      throw new Error('Invalid command name. Use 1-32 characters, letters, numbers, underscores only.');
    }

    if (!this.description || this.description.length > 100) {
      throw new Error('Description must be between 1 and 100 characters.');
    }

    if (!['slash', 'message', 'button', 'modal'].includes(this.type)) {
      throw new Error('Invalid command type.');
    }

    if (!this.code) {
      throw new Error('Command code is required.');
    }

    return true;
  }

  async save() {
    try {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });

      const content = Buffer.from(JSON.stringify(this.toJSON(), null, 2)).toString('base64');
      const filename = `${this.name}.json`;
      
      await octokit.repos.createOrUpdateFileContents({
        owner: 'Ayomide650',
        repo: 'my-bot-data',
        path: `commands/${filename}`,
        message: `Update command: ${this.name}`,
        content,
        committer: {
          name: 'Command Builder',
          email: 'commandbuilder@github.com'
        }
      });

      return true;
    } catch (error) {
      console.error('Error saving command:', error);
      throw new Error('Failed to save command');
    }
  }

  static async findByName(name) {
    try {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });

      const { data } = await octokit.repos.getContent({
        owner: 'Ayomide650',
        repo: 'my-bot-data',
        path: `commands/${name}.json`
      });

      const content = Buffer.from(data.content, 'base64').toString();
      const commandData = JSON.parse(content);

      return new Command(commandData);
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      code: this.code,
      variables: this.variables,
      permissions: this.permissions,
      options: this.options,
      template: this.template,
      cooldown: this.cooldown,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Command;
