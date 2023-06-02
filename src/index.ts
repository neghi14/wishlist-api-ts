import express, { Application } from 'express';
import Server from './common/server/index.server';

const app: Application = express();

new Server(app).start();

export default app;