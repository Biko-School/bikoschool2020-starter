import { Request, Response } from 'express'
import { MemeResponse } from '../../models/Responses'
import { MemeThumbnail } from '../../models/MemeThumbnail'
import { LowDbMemesRepository } from "./../lowdbRepository";
import { getRecentMemes } from './../../services'

export const recentsController = (req: Request, res: Response<MemeResponse>) => {
  const memesRepository = new LowDbMemesRepository(req.context.db);

  const memes: MemeThumbnail[] = getRecentMemes(memesRepository, { numRecentMemes: req.context.config.numRecentMemes })
  res.status(200).json({ memes })
}
