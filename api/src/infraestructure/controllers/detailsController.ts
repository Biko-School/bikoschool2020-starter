import { Request, Response } from 'express'
import { ErrorResponse } from '../../models/Responses'
import { MemeDetails } from '../../models/MemeDetails'
import { MemeSchema } from '../../models/MemeSchema'
import { mapMemeSchemaToMemeDetails } from './mappers'

export const detailsController = (
  req: Request,
  res: Response<MemeDetails | ErrorResponse>,
) => {
  const memeDatabase: MemeSchema = req.context.db
    .get('memes')
    .find({ id: req.params.id })
    .value()

  if (!memeDatabase) {
    res.status(404).send({
      status: 404,
      message: 'Meme not found',
    })
  }

  const meme: MemeDetails = mapMemeSchemaToMemeDetails(memeDatabase)
  res.status(200).json(meme)
}
