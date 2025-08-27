const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('API Endpoints', () => {
  const validToken = process.env.GITHUB_TOKEN;
  const headers = { 'x-github-token': validToken };

  describe('GET /api/variables', () => {
    it('should require authentication', async () => {
      const res = await request(app).get('/api/variables');
      expect(res.status).toBe(401);
    });

    it('should return all variables', async () => {
      const res = await request(app)
        .get('/api/variables')
        .set(headers);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('discord');
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('server');
    });
  });

  describe('POST /api/commands/create', () => {
    const validCommand = {
      name: 'test',
      description: 'Test command',
      type: 'slash',
      content: 'Hello {user.username}!'
    };

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/commands/create')
        .send(validCommand);
      expect(res.status).toBe(401);
    });

    it('should create valid command', async () => {
      const res = await request(app)
        .post('/api/commands/create')
        .set(headers)
        .send(validCommand);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.command).toHaveProperty('name', 'test');
      expect(res.body.command).toHaveProperty('code');
    });

    it('should reject invalid command', async () => {
      const invalidCommand = { ...validCommand, name: '!' };
      const res = await request(app)
        .post('/api/commands/create')
        .set(headers)
        .send(invalidCommand);
      
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/templates', () => {
    it('should return available templates', async () => {
      const res = await request(app)
        .get('/api/templates')
        .set(headers);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('basic');
      expect(res.body).toHaveProperty('moderation');
      expect(res.body).toHaveProperty('utility');
    });
  });
});
