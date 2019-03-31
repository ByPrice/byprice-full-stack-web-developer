const rc = require('rc');

module.exports = rc('byprice', {
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGO_DB || 'mongodb://localhost/fullstackwebdeveloper',
});
