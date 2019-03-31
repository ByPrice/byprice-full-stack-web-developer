const request = require('supertest');
const server = require('../server');

describe('Home', () => {
  it('Should return 200', async () => {
    await request(server.listen())
      .get('/')
      .expect(200);
  });
});
