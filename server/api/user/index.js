const Router = require('koa-router');

// Models
const User = require('../../models/users');

const router = new Router();

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */

router.post('/', async (ctx, next) => {
  const { firstName, lastName, email } = ctx.request.body;

  if (!firstName && !email) {
    ctx.response.status = 400;
    ctx.response.body = { message: 'firstName and email are required' };

    return;
  }

  if (typeof firstName !== 'string' && email) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'firstName must be of type string',
    };

    return;
  }

  if (firstName && typeof email !== 'string') {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'email must be of type string',
    };

    return;
  }

  if (lastName) {
    if (typeof lastName === 'string') {
      const user = new User({ firstName, lastName, email });

      try {
        const addedUser = await user.save();

        ctx.response.status = 200;
        ctx.response.body = {
          userInformation: addedUser,
          message: 'User created',
        };
      } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
          error: error.message,
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        message: 'lastName must be of type string',
      };
    }
  } else {
    const user = new User({ firstName, email });

    try {
      const addedUser = await user.save();

      ctx.response.status = 200;
      ctx.response.body = {
        userInformation: addedUser,
        message: 'User created',
      };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  }

  await next();
});

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.get('/', async (ctx, next) => {
  try {
    const users = await User.find();
    ctx.response.status = 200;
    ctx.response.body = {
      users,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: error.message,
    };
  }

  await next();
});

/**
 * [Route]
 *
 * @param {Object} ctx Koa context
 * @param {Function} next Koa next middleware
 */
router.put('/:userId', async (ctx, next) => {
  const { userId } = ctx.params;
  const { firstName, lastName, email, status } = ctx.request.body;

  // Verify if user exits
  await User.findOne({ _id: userId });

  if (firstName && typeof firstName !== 'string') {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'firstName must be of type string',
    };

    return;
  }

  if (email && typeof email !== 'string') {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'email must be of type string',
    };

    return;
  }

  if (lastName && typeof lastName !== 'string') {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'lastName must be of type string',
    };

    return;
  }

  if (status && typeof status !== 'string') {
    ctx.response.status = 400;
    ctx.response.body = {
      message: 'status must be of type string',
    };

    return;
  }
  try {
    const updatedUser = await User.where({ userId })
      .update({
        email,
        firstName,
        lastName: lastName || null,
        status: status || null,
      })
      .exec();
    ctx.response.status = 200;
    ctx.response.body = {
      userInformation: updatedUser,
      message: `User updated with userId: ${userId}`,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: error.message,
    };
  }

  await next();
});

module.exports = router;
