/* eslint-disable consistent-return */
/* eslint-disable no-console */

const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const render = require('koa-ejs');
const koasStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const pckg = require('./package.json');
const config = require('./config');

/* Middlewares */
const main = require('./server/main');
const shortestword = require('./server/api/shortestword');

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
  debug: true,
});

app.use(bodyParser());
app.use(koasStatic('public/js'));
app.use(koasStatic('public/css'));

app.use(async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    if (ctx.header['content-type'] === 'application/json') {
      ctx.type = 'application/json';
      ctx.status = err.status;
      ctx.body = {
        message: err.message,
      };
    }
  }
});

router.get('/', main.render);
router.use('/api/shortestword/', shortestword());

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
