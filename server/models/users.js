const mongoose = require('mongoose');

/**
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} status
 * @property {Date} createdAt - Creation date (default Date.now)
 * @property {Date} updatedAt - Last update date
 * @property {Date} removedAt - Remove date
 */
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'disabled', 'removed'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    removedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', schema);
