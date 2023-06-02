import { Application, Request, Response } from 'express';
import Http from '../utils/http.utils';
import { IError } from '../helpers/error.helpers';

export default class Router {
  http;
  app: Application;
  constructor(app: Application) {
    this.app = app;
    this.http = new Http();
  }
  init() {
    //HealthCheck
    this.app.get('/health-check', (req: Request, res: Response) => {
      res.sendStatus(200);
    });

    //ERROR HANDLING
    this.app.all('*', (req: Request, res: Response) => {
      this.http.Response({
        res,
        status: 'error',
        statusCode: 404,
        message: '404, Page not found!',
      });
    });

    this.app.use((err: IError, req: Request, res: Response) => {
      err.status = err.status || 'error';
      err.statusCode = err.statusCode || 500;
      this.http.Response({
        res,
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
      });
    });
  }
}
