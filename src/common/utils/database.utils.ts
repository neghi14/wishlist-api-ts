import mongoose, { Document, Model, Mongoose } from 'mongoose';
import config from 'config';
import logging from './logging.utils';

class Database {
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
  async readAll(model: Model<any>, query?: any) {
    try {
      return model.find(query);
    } catch (error) {
      return error;
    }
  }
  async readOne(model: Model<any>, params: Record<string, string | any>) {
    try {
      return model.findOne(params);
    } catch (error) {
      return error;
    }
  }
  async createOne(model: Model<any>, payload: Record<string, string | any>) {
    try {
      return model.create(payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(model: Model<any>, params: Record<string, string | any>, payload: Record<string, string | any>) {
    try {
      return model.findByIdAndUpdate(params, payload, { new: true });
    } catch (error) {
      return error;
    }
  }
  async deleteOne(model: Model<any>, params: Record<string, string | any>) {
    try {
      return model.findByIdAndDelete(params);
    } catch (error) {
      return error;
    }
  }
}

export default new Database(mongoose);
