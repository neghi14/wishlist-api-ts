/* eslint-disable comma-dangle */
/* eslint-disable semi */

require('dotenv').config();

module.exports = {
  url: 'mongodb://127.0.0.1:27017/wishlist-dev',
  env: 'development',
  port: 1337,
  app: 'localhost',
  private_key: process.env.TOKEN_PRIVATE_KEY,
  public_key: process.env.TOKEN_PUBLIC_KEY,
  sessionTokenTtl: '60000',
  refreshTokenTtl: '1y',
};
