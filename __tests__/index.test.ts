import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index';

describe('POST /DevOps', () => {
  it('should return message for valid request', async () => {
    const token = jwt.sign({ user: 'testUser' }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: '1h' });

    const response = await request(app)
      .post('/DevOps')
      .set('X-Parse-REST-API-Key', '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c')
      .set('X-JWT-KWY', token)
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