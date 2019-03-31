/* eslint-disable no-console */

const Koa = require('koa');
const router = require('koa-router')();
const mongoose = require('mongoose');
const render = require('koa-ejs');
const koasStatic = require('koa-static');
const path = require('path');

const pckg = require('./package.json');
const config = require('./config');

/* Middlewares */
const main = require('./server/main');

const server = new Koa();

render(server, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
});

server.use(koasStatic('public/js'));
server.use(koasStatic('public/css'));

mongoose.connect(config.mongodb);
mongoose.connection.on(
  'error',
  console.error.bind(
    console,
    `Please check your mongo connection: ${config.mongodb}`,
  ),
);

if (module.parent) {
  module.exports = new Promise((resolve) => {
    mongoose.connection.once('open', () => {
      router.get('/', main.render);

      server.use(router.routes()).use(router.allowedMethods());
      resolve(server);
    });
  });
} else {
  mongoose.connection.once('open', () => {
    router.get('/', main.render);

    server.use(router.routes()).use(router.allowedMethods());

    server.listen(config.port, () => {
      console.info('process.env.NODE_ENV', process.env.NODE_ENV);
      console.info('version', pckg.version);
      console.info(JSON.stringify(config));
    });

    console.info.bind(
      console,
      `Is it connected to mongo at: ${config.mongodb}`,
    );
  });
}
