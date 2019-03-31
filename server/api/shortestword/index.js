/**
 * [Middleware]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
const shortestword = async (ctx, next) => {
  const { list } = ctx.request.body;

  console.log('list', list);

  await next();
};

module.shortestword = shortestword;
