const request = require('supertest');
const server = require('../server');

describe('POST /api/user/', () => {
  it('Should get 200 with user information when receives firstName and lastName: firstName, lastName, email, status, createdAt, updatedAt, removedAt', async () => {
    await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect(200);
  });

  it("Should get 400 with message: `firstName and email are required` when doesn't receives firstName and email", async () => {
    await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: null,
        lastName: 'Shipka',
        email: null,
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'firstName and email are required',
      });
  });

  it('should get 400 with message: `firstName must be of type string` when receives firstName with different type of string', async () => {
    await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 534534543,
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'firstName must be of type string',
      });
  });

  it('should get 400 with message: `email must be of type string` when receives email with different type of string', async () => {
    await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 453534,
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'email must be of type string',
      });
  });

  it('should get 400 with message: `lastName must be of type string` when receives lastName with different type of string', async () => {
    await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 54353,
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'lastName must be of type string',
      });
  });
});

describe('GET /api/user/', () => {
  it('Should get 200 with the list of all users', async () => {
    await request(server.listen())
      .get('/api/user/')
      .expect(200);
  });
});

describe('PUT /api/user/:userId', () => {
  it('Should get 200 with the updated user information when receives userId and firstName || lastName || email || status', async () => {
    const { body } = await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json');

    // eslint-disable-next-line no-underscore-dangle
    const userId = body.userInformation._id;

    await request(server.listen())
      .put(`/api/user/${userId}`)
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
        status: 'active',
      })
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('should get 400 with message: `firstName must be of type string` when receives firstName with different type of string', async () => {
    const { body } = await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json');

    // eslint-disable-next-line no-underscore-dangle
    const userId = body.userInformation._id;

    await request(server.listen())
      .put(`/api/user/${userId}`)
      .send({
        firstName: 543534,
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
        status: 'active',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'firstName must be of type string',
      });
  });

  it('should get 400 with message: `email must be of type string` when receives email with different type of string', async () => {
    const { body } = await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json');

    // eslint-disable-next-line no-underscore-dangle
    const userId = body.userInformation._id;

    await request(server.listen())
      .put(`/api/user/${userId}`)
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 543564353,
        status: 'active',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'email must be of type string',
      });
  });

  it('should get 400 with message: `lastName must be of type string` when receives lastName with different type of string', async () => {
    const { body } = await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json');

    // eslint-disable-next-line no-underscore-dangle
    const userId = body.userInformation._id;

    await request(server.listen())
      .put(`/api/user/${userId}`)
      .send({
        firstName: 'Kierna',
        lastName: 654654654,
        email: 'kierna_shipka@gmail.com',
        status: 'active',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'lastName must be of type string',
      });
  });

  it('should get 400 with message: `status must be of type string` when receives status with different type of string', async () => {
    const { body } = await request(server.listen())
      .post('/api/user/')
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
      })
      .set('Accept', 'application/json');

    // eslint-disable-next-line no-underscore-dangle
    const userId = body.userInformation._id;

    await request(server.listen())
      .put(`/api/user/${userId}`)
      .send({
        firstName: 'Kierna',
        lastName: 'Shipka',
        email: 'kierna_shipka@gmail.com',
        status: 534534,
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'status must be of type string',
      });
  });
});
