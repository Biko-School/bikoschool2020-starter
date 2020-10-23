import express, { Express } from 'express';
import logger from 'morgan';
import { createMemesRouter } from './routes';
import Lowdb from 'lowdb';
import { DbSchema } from './dbSchema';

export const createApp = (db: Lowdb.LowdbSync<DbSchema>): Express => {
  const app = express();
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('combined'));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api', createMemesRouter(db));
  return app;
};
