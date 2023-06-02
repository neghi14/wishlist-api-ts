/* eslint-disable semi */
/* eslint-disable comma-dangle */
require('dotenv').config();

module.exports = {
  url: process.env.MONGODB_URI || ' ',
  app: process.env.APP_URL,
};
