const request = require('supertest');
const app = require('./index');

describe('POST /DevOps', () => {
  it('should return message for valid request', async () => {
    const response = await request(app)
      .post('/DevOps')
      .set('X-Parse-REST-API-Key', 'api_key')
      .send({
        message: 'This is a test',
        to: 'Juan Perez',
        from: 'Rita Asturia',
        timeToLifeSec: 45
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello Juan Perez your message will be send'
    });
  });

  it('should return error for invalid API Key', async () => {
    const response = await request(app)
      .post('/DevOps')
      .set('X-Parse-REST-API-Key', 'invalid-api-key')
      .send({
        message: 'This is a test',
        to: 'Juan Perez',
        from: 'Rita Asturia',
        timeToLifeSec: 45
      });

    expect(response.statusCode).toBe(403);
    expect(response.text).toBe('ERROR: Invalid API Key');
  });
});