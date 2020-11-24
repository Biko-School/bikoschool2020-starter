import { Request, Response } from 'express'
import { MemeResponse, ErrorResponse } from './../models/Responses'
import { MemeThumbnail } from '../models/MemeThumbnail'
import { MemeDto } from './../models/MemeDto'
import { mapMemesDatabaseToMemes } from "./mappers"

const normalizeSearchTerm = (searchTerm: string): string => {
    const words: string[] = searchTerm.trim().split(" ").filter(Boolean);
    return words.join(" ").toLocaleLowerCase();
  }

export const searchController = (req: Request, res: Response<MemeResponse | ErrorResponse>) => {
    const query = normalizeSearchTerm(req.query.q as string)

  if (query.length < 3) {
    res.status(400).send({
      status: 400,
      message: "The search term should 3 or more characters"
    })
  }
  const databaseMemes: MemeDto[] = req.context.db
    .get('memes')
    .filter((meme) => {
      return meme.tags.some((tag) => tag.includes(query))
    })
    .sortBy('import_datetime')
    .reverse()
    .value()

  const memes: MemeThumbnail[] = mapMemesDatabaseToMemes(databaseMemes)
  res.status(200).json({ memes })
}