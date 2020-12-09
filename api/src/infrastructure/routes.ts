import express from 'express';
import { getRecentMemes } from '../application/getRecentMemes';
import { getMemesBySearchTerm } from '../application/getMemesBySearchTerm';
import { getMemeById } from '../application/getMemeById';
import { AppConfig } from '../app';
import { mapToMemeThumbDTO } from './MemeThumb.dto';

export const createMemesRouter = (appConfig: AppConfig): express.Router => {
  const router = express.Router();

  router.get('/memes', function (req, res) {
    const recentMemes = getRecentMemes(appConfig.numRecentMemes).map((meme) =>
      mapToMemeThumbDTO(meme),
    );
    res.status(200).json({ memes: recentMemes });
  });

  router.get('/search/:searchTerm', function (req, res) {
    try {
      const searchResult = getMemesBySearchTerm(
        req.params.searchTerm,
      ).map((meme) => mapToMemeThumbDTO(meme));
      res.status(200).json({ memes: searchResult });
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  router.get('/meme/:id', function (req, res) {
    const meme = getMemeById(req.params.id);
    if (meme !== false) {
      res.status(200).json(meme);
    } else {
      res.status(404).send('El meme no existe');
    }
  });

  return router;
};
