import { Application } from 'express';
import config from 'config';

export default class Server {
  private app: Application;
  private port: number;
  constructor(app: Application) {
    this.app = app;
    this.port = config.get('port');
  }
  start() {
    this.app.listen(this.port, () => {
      console.log('app running successfully on localhost');
    });
  }
}
