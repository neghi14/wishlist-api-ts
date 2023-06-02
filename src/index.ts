import express, { Application } from 'express';
import Server from './common/server/index.server';
import databaseUtils from './common/utils/database.utils';

const app: Application = express();

new Server(app).start();
databaseUtils.connect();

export default app;
