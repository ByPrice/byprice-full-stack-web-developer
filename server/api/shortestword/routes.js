const Router = require('koa-router');

const router = new Router();

/**
 * [Endpoint]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.post('/', async (ctx, next) => {
  const { list } = ctx.request.body;

  await next();
});

module.exports = router;
