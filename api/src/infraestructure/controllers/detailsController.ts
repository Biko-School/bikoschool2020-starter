import { Request, Response } from 'express'
import { ErrorResponse } from '../../domain/models/Responses'
import { MemeDetails } from '../../domain/models/MemeDetails'
import { getDetails } from '../../services/getDetails'
import { LowDbMemesRepository } from '../lowdbRepository'
import { MemeDoesNotExistException } from "./../../domain/exceptions"

export const detailsController = (
  req: Request,
  res: Response<MemeDetails | ErrorResponse>,
) => {
  const memesRepository = new LowDbMemesRepository(req.context.db);

  try {
    const meme: MemeDetails = getDetails(memesRepository, req.params.id);
    res.status(200).json(meme)
  }
  catch (error) {
    if (error instanceof MemeDoesNotExistException) {
      res.status(404).send({
        status: 404,
        message: error.message
      })
    } else {
      throw error
    }
    
  }
}
