/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

const request = require('supertest');

process.env.NODE_ENV = 'test';

/* Also test can work using a remote url */
const port = process.env.TEST_PORT || 3000;

before(async () => {
  const server = await require('../server');
  this.server = server.listen(port);
  this.agent = request.agent(this.server);
});

after(async () => {
  this.server.close();
});
