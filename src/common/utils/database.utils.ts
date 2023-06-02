import mongoose, { Mongoose } from 'mongoose';
import config from 'config';
import logging from './logging.utils';

class database {
  driver: Mongoose;
  url: string;
  constructor(driver: Mongoose) {
    this.driver = driver;
    this.url = config.get('url');
  }
  connect() {
    this.driver
      .connect(this.url)
      .then(() => {
        logging.info(`Connection to Database Successful!`);
      })
      .catch((error) => {
        logging.error(error.message);
      });
  }
}

export default new database(mongoose);
