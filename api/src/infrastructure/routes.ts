import express from 'express';
import { getRecentMemes } from '../application/getRecentMemes';
import { getMemesBySearchTerm } from '../application/getMemesBySearchTerm';
import { AppConfig } from '../app';

export const createMemesRouter = (appConfig: AppConfig): express.Router => {
  const router = express.Router();

  router.get('/memes', function (req, res) {
    const recentMemes = getRecentMemes(appConfig.numRecentMemes);
    res.status(200).json({ memes: recentMemes });
  });

  router.get('/search/:searchTerm', function (req, res) {
    try {
      const searchResult = getMemesBySearchTerm(req.params.searchTerm);
      res.status(200).json({ memes: searchResult });
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  return router;
};
