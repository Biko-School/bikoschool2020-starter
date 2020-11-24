import { Request, Response } from 'express'
import { MemeResponse } from './../models/Responses'
import { MemeThumbnail } from '../models/MemeThumbnail'
import { MemeDto} from './../models/MemeDto'
import { mapMemesDatabaseToMemes } from "./mappers"

export const recentsController = (req: Request, res: Response<MemeResponse>) => {
    const databaseMemes: MemeDto[] = req.context.db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(req.context.config.numRecentMemes)
      .value()
  
    const memes: MemeThumbnail[] = mapMemesDatabaseToMemes(databaseMemes)
    res.status(200).json({ memes })
  }
