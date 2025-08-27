const { expect } = require('chai');
const codeGenerator = require('../utils/codeGenerator');

describe('Code Generator', () => {
  describe('Command Generation', () => {
    it('should generate slash command', () => {
      const data = {
        name: 'test',
        description: 'Test command',
        type: 'slash',
        content: 'Hello world!'
      };

      const result = codeGenerator.generateCommand(data);
      expect(result).toHaveProperty('name', 'test');
      expect(result).toHaveProperty('type', 'slash');
      expect(result.code).toContain('interaction.reply');
    });

    it('should handle variables in content', () => {
      const data = {
        name: 'greet',
        description: 'Greet user',
        type: 'slash',
        content: 'Hello {user.username}!'
      };

      const result = codeGenerator.generateCommand(data);
      expect(result.code).toContain('${interaction.user.username}');
    });

    it('should generate embed response', () => {
      const data = {
        name: 'embed',
        description: 'Embed test',
        type: 'slash',
        responseType: 'embed',
        content: 'title: Test\ndescription: Test embed'
      };

      const result = codeGenerator.generateCommand(data);
      expect(result.code).toContain('EmbedBuilder');
      expect(result.code).toContain('setTitle');
    });
  });

  describe('Template Usage', () => {
    it('should use basic template', () => {
      const data = {
        name: 'ping',
        description: 'Ping command',
        type: 'slash',
        template: 'basic'
      };

      const result = codeGenerator.generateCommand(data);
      expect(result.code).toBeTruthy();
      expect(result.category).toBe('basic');
    });

    it('should handle moderation template', () => {
      const data = {
        name: 'kick',
        description: 'Kick user',
        type: 'slash',
        template: 'moderation',
        permissions: ['KICK_MEMBERS']
      };

      const result = codeGenerator.generateCommand(data);
      expect(result.code).toContain('KICK_MEMBERS');
      expect(result.permissions).toContain('KICK_MEMBERS');
    });
  });

  describe('Error Handling', () => {
    it('should add error handling to commands', () => {
      const data = {
        name: 'test',
        description: 'Test command',
        type: 'slash',
        content: 'Test'
      };

      const result = codeGenerator.generateCommand(data);
      expect(result.code).toContain('try');
      expect(result.code).toContain('catch');
    });
  });
});
