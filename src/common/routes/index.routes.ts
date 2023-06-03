import { Application, NextFunction, Request, Response } from 'express';
import Http from '../utils/http.utils';
import { IError } from '../helpers/error.helpers';
import userRoute from '../../module/User/routes/user.routes';
import sessionRoute from '../../module/Session/routes/session.routes';
import authRoute from '../../module/User/routes/auth/auth.routes';

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

    //ROUTES
    this.app.use('/api/v1/user', userRoute);
    this.app.use('/api/v1/session', sessionRoute);
    this.app.use('/api/v1/auth', authRoute);

    //ERROR HANDLING
    this.app.all('*', (req: Request, res: Response) => {
      this.http.Response({
        res,
        status: 'error',
        statusCode: 404,
        message: '404, Page not found!',
      });
    });

    this.app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
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
