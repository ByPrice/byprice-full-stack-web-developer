/* eslint-disable consistent-return */
/* eslint-disable no-console */

const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const render = require('koa-ejs');
const koasStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const config = require('./config');
const pckg = require('./package.json');

/* Middlewares */
const main = require('./server/main');
const shortestword = require('./server/api/shortestword');
const user = require('./server/api/user');

const app = new Koa();
const router = new Router();

mongoose.connect(config.mongodb);
mongoose.connection.on(
  'error',
  console.error.bind(
    console,
    `Please check your mongo connection: ${config.mongodb}`,
  ),
);
mongoose.connection.once(
  'open',
  console.info.bind(console, `Is it connected to mongo at: ${config.mongodb}`),
);

render(app, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false,
});

app.use(bodyParser());
app.use(koasStatic('public/js'));
app.use(koasStatic('public/css'));

// Error Handling
app.use(async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    ctx.type = 'application/json';
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

router.use('/api/user', user.routes());
router.use('/api/shortestword', shortestword.routes());
router.get('/', main.render);

app.use(router.routes()).use(router.allowedMethods());

if (module.parent) {
  module.exports = app;
} else {
  app.listen(config.port, () => {
    console.info('process.env.NODE_ENV', process.env.NODE_ENV);
    console.info('version', pckg.version);
    console.info(JSON.stringify(config));
  });
}
