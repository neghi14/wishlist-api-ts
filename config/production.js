/* eslint-disable semi */
/* eslint-disable comma-dangle */
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  url: process.env.MONGODB_URI,
  app: process.env.APP_URL,
  private_key: process.env.TOKEN_PRIVATE_KEY,
  public_key: process.env.TOKEN_PUBLIC_KEY,
};
