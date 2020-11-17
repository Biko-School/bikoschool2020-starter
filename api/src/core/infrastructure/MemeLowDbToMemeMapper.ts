import { MemeDb } from 'core/infrastructure/model/MemeDb'
import { MemeResponse } from 'core/domain/MemeResponse'

export const memeLowDbToMeme = (memeDb: MemeDb) => {
  const meme: MemeResponse = {
    url: memeDb.images.small.url,
    title: memeDb.title,
    id: memeDb.id,
    date: memeDb.import_datetime,
    tags: memeDb.tags,
    width: memeDb.images.small.width,
    height: memeDb.images.small.height,
  }
  return meme
}
