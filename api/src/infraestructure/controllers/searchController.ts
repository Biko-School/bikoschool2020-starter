import { Request, Response } from 'express'
import { MemeResponse, ErrorResponse } from '../../domain/models/Responses'
import { MemeThumbnail } from '../../domain/models/MemeThumbnail'
import { searchMemes } from "../../services"
import { InvalidSearchTermException } from './../../domain/exceptions'

export const searchController = (req: Request, res: Response<MemeResponse | ErrorResponse>) => {
  try {
    const memes: MemeThumbnail[] = searchMemes(
      req.context.memesRepository,
      {
        searchTerm: req.query.q as string,
        forbiddenSearchTerms: req.context.config.forbiddenSearchTerms
      }
    )
    res.status(200).json({ memes })
  }
  catch (error) {
    if (error instanceof InvalidSearchTermException) {
      res.status(400).json({
        status: 400,
        message: error.message
      })
    }
    else {
      throw error
    }
  }
}