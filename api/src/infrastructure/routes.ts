import express from 'express';
import { getRecentMemes } from '../application/getRecentMemes';
import { getMemesBySearchTerm } from '../application/getMemesBySearchTerm';
import { getMemeById } from '../application/getMemeById';
import { AppConfig } from '../app';
import { mapToMemeThumbDTO } from './MemeThumb.dto';
import { mapToMemeDetailDTO } from './MemeDetail.dto';

export const createMemesRouter = (appConfig: AppConfig): express.Router => {
  const router = express.Router();

  router.get('/memes', function (req, res) {
    const recentMemes = getRecentMemes(appConfig.numRecentMemes).map(
      mapToMemeThumbDTO,
    );
    res.status(200).json({ memes: recentMemes });
  });

  router.get('/search/:searchTerm', function (req, res) {
    try {
      const searchResult = getMemesBySearchTerm(req.params.searchTerm).map(
        mapToMemeThumbDTO,
      );
      res.status(200).json({ memes: searchResult });
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  router.get('/meme/:id', function (req, res) {
    const meme = getMemeById(req.params.id);
    if (meme !== false) {
      const memeDetailDto = mapToMemeDetailDTO(meme);
      res.status(200).json(memeDetailDto);
    } else {
      res.status(404).send('El meme no existe');
    }
  });

  return router;
};
