import { Request, Response } from 'express'
import { ErrorResponse } from '../../models/Responses'
import { MemeDetails } from '../../models/MemeDetails'
import { getDetails } from './../../services/getDetails'
import { LowDbMemesRepository } from './../lowdbRepository'

export const detailsController = (
  req: Request,
  res: Response<MemeDetails | ErrorResponse>,
) => {
  const memesRepository = new LowDbMemesRepository(req.context.db);

  try {
    const meme: MemeDetails = getDetails(memesRepository, req.params.id);
    res.status(200).json(meme)
  }
  catch (e) {
    res.status(404).send({
      status: 404,
      message: e.message,
    })
  }
}
