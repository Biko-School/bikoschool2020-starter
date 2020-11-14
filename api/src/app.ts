import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan';
import { createMemesRouter } from './infrastructure/routes';
import Lowdb from 'lowdb';
import { DbSchema } from './infrastructure/dbSchema';
import { LowDbMemesRepository } from './infrastructure/LowDbMemesRepository';
import { setMemesRepository } from './application/MemesRepository';

export interface AppConfig {
  numRecentMemes: number;
}

let defaultAppConfig: AppConfig = {
  numRecentMemes: 50,
};

export const createApp = (
  db: Lowdb.LowdbSync<DbSchema>,
  appConfig: Partial<AppConfig> = defaultAppConfig,
): Express => {
  setMemesRepository(new LowDbMemesRepository(db));
  const appConfigFull: AppConfig = { ...defaultAppConfig, ...appConfig };
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('combined'));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api', createMemesRouter(appConfigFull));
  return app;
};
