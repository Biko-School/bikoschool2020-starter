import { Request, Response } from 'express'
import { MemeResponse } from '../../domain/models/Responses'
import { MemeThumbnail } from '../../domain/models/MemeThumbnail'
import { getRecentMemes } from '../../services'

export const recentsController = (req: Request, res: Response<MemeResponse>) => {
  const memes: MemeThumbnail[] = getRecentMemes(req.context.memesRepository, { numRecentMemes: req.context.config.numRecentMemes })
  res.status(200).json({ memes })
}
