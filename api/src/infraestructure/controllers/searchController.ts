import { Request, Response } from 'express'
import { MemeResponse, ErrorResponse } from '../../domain/models/Responses'
import { MemeThumbnail } from '../../domain/models/MemeThumbnail'
import {searchMemes } from "../../services"
import { LowDbMemesRepository } from '../lowdbRepository'
import { InvalidSearchTermException } from './../../domain/exceptions'

export const searchController = (req: Request, res: Response<MemeResponse | ErrorResponse>) => {
    
    const memesRepository = new LowDbMemesRepository(req.context.db);
    try {
      const memes: MemeThumbnail[] = searchMemes(memesRepository, { searchTerm: req.query.q as string})
      res.status(200).json({ memes })
    }
    catch (error) {
      if (error instanceof InvalidSearchTermException) {
        res.status(400).send({
          status: 400,
          message: error.message
        })
      }
      else {
        throw error
      }
    }
}