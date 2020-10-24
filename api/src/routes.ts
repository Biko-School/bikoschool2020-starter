import express from 'express';
import Lowdb from 'lowdb';
import { DbSchema, MemeDb } from './dbSchema';
import { MemeThumb, RecentMemesData } from '../memesInterfaces';
import { AppConfig } from './app';

export const createMemesRouter = (
  db: Lowdb.LowdbSync<DbSchema>,
  appConfig: AppConfig,
): express.Router => {
  const router = express.Router();
  router.get('/memes', function (req, res) {
    const recentMemesDb: Array<MemeDb> = db
      .get('memes')
      .orderBy('import_datetime', 'desc')
      .take(appConfig.numRecentMemes)
      .value();
    const recentMemesApi: RecentMemesData = {
      memes: recentMemesDb.map(
        (memeDb): MemeThumb => ({
          id: memeDb.id,
          title: memeDb.title,
          url: memeDb.images.original.url,
        }),
      ),
    };
    res.status(200).json(recentMemesApi);
  });
  return router;
};
