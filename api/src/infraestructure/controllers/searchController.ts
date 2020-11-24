import { Request, Response } from 'express'
import { MemeResponse, ErrorResponse } from '../../models/Responses'
import { MemeThumbnail } from '../../models/MemeThumbnail'
import {searchMemes } from "./../../services"
import { LowDbMemesRepository } from './../../infraestructure/lowdbRepository'

export const searchController = (req: Request, res: Response<MemeResponse | ErrorResponse>) => {
    
    const memesRepository = new LowDbMemesRepository(req.context.db);
    try {
      const memes: MemeThumbnail[] = searchMemes(memesRepository, { searchTerm: req.query.q as string})
      res.status(200).json({ memes })
    }
    catch (e) {
      res.status(400).send(e.message)
    }
}