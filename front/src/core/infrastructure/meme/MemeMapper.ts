import { Meme } from '../../domain/meme/Meme'
import { MemesDataDTO } from './MemesDataDTO'

export function memeMapper(entity: MemesDataDTO): Meme {
  return {
    id: entity.id,
    title: entity.title,
    image: {
      width: entity.image.width,
      height: entity.image.height,
      url: entity.image.url,
    },
    date: new Date(entity.date),
    tags: entity.tags,
    user: entity.user,
  }
}

export function convertJsonMemesToDomainMeme(
  memesData: MemesDataDTO[],
): Meme[] {
  let mappedMemes: Meme[] = []
  for (let meme of memesData) {
    mappedMemes.push(memeMapper(meme))
  }
  return mappedMemes
}
