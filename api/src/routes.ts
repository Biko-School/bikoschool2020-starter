import express from 'express';
import Lowdb from 'lowdb';
import { DbSchema, MemeDb } from './dbSchema';
import { MemeThumb, MemeThumbList } from '../memesInterfaces';
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
    const recentMemesApi: MemeThumbList = {
      memes: memesDbToMemesThumbApi(recentMemesDb),
    };
    res.status(200).json(recentMemesApi);
  });

  router.get('/search/:terms', function (req, res) {
    let terms = req.params.terms;

    if (terms.length < 3) {
      res.status(422).send('La búsqueda debe contener al menos 3 caracteres.');
      return;
    }

    const searchResultMemesDb: Array<MemeDb> = db
      .get('memes')
      .filter((meme) => {
        const tagsMatch = meme.tags.filter((tag) => tag.includes(`${terms}`));
        return tagsMatch.length > 0;
      })
      .value();
    const searchResultMemesApi: MemeThumbList = {
      memes: memesDbToMemesThumbApi(searchResultMemesDb),
    };
    res.status(200).json(searchResultMemesApi);
  });

  return router;
};

function memesDbToMemesThumbApi(memesDb: Array<MemeDb>): Array<MemeThumb> {
  return memesDb.map(
    (memeDb): MemeThumb => ({
      id: memeDb.id,
      title: memeDb.title,
      url: memeDb.images.original.url,
    }),
  );
}
