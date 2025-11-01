const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
describe('User Profile', () => {
it('should return not found', async () => {
    const response = await request(app).get('/api/auth/profile');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ msg: 'Token not Found !' });
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });
})

