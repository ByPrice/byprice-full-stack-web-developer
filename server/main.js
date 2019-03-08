
/**
 * [Middleware]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
async function render(ctx, next) {
  ctx.state = {
    user: {
      name: 'Hi!'
    }
  }
  await ctx.render('home');
  await next()
}

exports.render = render
