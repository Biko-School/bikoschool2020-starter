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
    const recentMemesFromDb: Array<MemeDb> = db
      .get('memes')
      .orderBy('import_datetime', 'desc')
      .take(appConfig.numRecentMemes)
      .value();
    const recentMemesResponseBody: MemeThumbList = {
      memes: memesDbToMemesThumbApi(recentMemesFromDb),
    };
    res.status(200).json(recentMemesResponseBody);
  });

  router.get('/search/:searchTerm', function (req, res) {
    let searchTerm = req.params.searchTerm.trim().replace(/\s+/, ' ');
    searchTerm = searchTerm.toLowerCase();

    if (searchTerm.length < 3) {
      res.status(422).send('La búsqueda debe contener al menos 3 caracteres.');
      return;
    }

    const searchResultsFromDb: Array<MemeDb> = db
      .get('memes')
      .filter((meme) => {
        const tagsMatch = meme.tags.filter((tag) =>
          tag.toLowerCase().includes(searchTerm),
        );
        return tagsMatch.length > 0;
      })
      .orderBy('import_datetime', 'desc')
      .value();
    const searchResponseBody: MemeThumbList = {
      memes: memesDbToMemesThumbApi(searchResultsFromDb),
    };
    res.status(200).json(searchResponseBody);
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
