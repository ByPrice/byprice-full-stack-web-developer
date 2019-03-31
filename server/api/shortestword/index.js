/**
 * [Middleware]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
const shortestword = async (ctx, next) => {
  const { list } = ctx.request.body;

  if (list && Array.isArray(list) === false) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'List should be an Array',
    };
  } else if (list && Array.isArray(list) && list.length >= 2) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'List min length allowed 2',
    };
  } else if (list && Array.isArray(list) && list.length <= 8) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'List max length allowed 8',
    };
  } else {
    const lengthWords = list.map((item) => item.length);
    const minLenght = Math.min(...lengthWords);

    ctx.response.status = 200;
    ctx.response.body = {
      shortestLength: minLenght,
    };
  }

  await next();
};

module.exports = shortestword;
