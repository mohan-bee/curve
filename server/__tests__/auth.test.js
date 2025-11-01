const request = require('supertest');
const app = require('../index'); 

describe('User Profile', () => {
it('should return not found', async () => {
    const response = await request(app).get('/api/auth/profile');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ msg: 'Token not Found !' });
  });
});

