import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import Server from './common/server/index.server';
import databaseUtils from './common/utils/database.utils';
import Router from './common/routes/index.routes';
import dotenv from 'dotenv';
import config from 'config';

const app: Application = express();

//Middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE, OPTIONS');

  next();
});
if (config.get('env') === 'development') {
  app.use(morgan('dev'));
}

//Router Config
new Router(app).init();
//Server Config
new Server(app).start();
//Database Config
databaseUtils.connect();

export default app;
