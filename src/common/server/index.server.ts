import { Application } from 'express';
import config from 'config';
import logging from '../utils/logging.utils';

export default class Server {
  private app: Application;
  private port: number;
  private url: string;
  constructor(app: Application) {
    this.app = app;
    this.port = config.get('port');
    this.url = config.get('app');
  }
  start() {
    this.app.listen(this.port, () => {
      logging.info(`Server up! visit at http://${this.url}:${this.port}`);
    });
  }
}
