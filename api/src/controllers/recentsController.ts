import { Request, Response } from 'express'
import { MemeResponse } from './../models/Responses'
import { Meme } from './../models/Meme'
import { MemeDatabase} from './../models/DatabaseSchema'
import { mapMemesDatabaseToMemes } from "./mappers"

export const recentsController = (req: Request, res: Response<MemeResponse>) => {
    const databaseMemes: MemeDatabase[] = req.context.db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(req.context.config.numRecentMemes)
      .value()
  
    const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
    res.status(200).json({ memes })
  }
