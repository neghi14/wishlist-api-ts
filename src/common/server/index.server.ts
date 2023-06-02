import { Application } from 'express';
import config from 'config';
import logging from '../utils/logging.utils';

export default class Server {
  private app: Application;
  private port: number;
  constructor(app: Application) {
    this.app = app;
    this.port = config.get('port');
  }
  start() {
    this.app.listen(this.port, () => {
      logging.info(`Server up! visit at http://localhost:${this.port}`);
    });
  }
}
