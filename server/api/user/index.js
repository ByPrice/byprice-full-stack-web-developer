const Router = require('koa-router');

const router = new Router();

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.post('/', (ctx, next) => {
  next();
});

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.get('/', (ctx, next) => {
  next();
});

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.put('/:userId', (ctx, next) => {
  next();
});

module.exports = router;
