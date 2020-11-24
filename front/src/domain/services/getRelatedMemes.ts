import { Meme } from '../models/Meme'
import { MemeDTO } from './getTrendingMemes'
import { MemesDataDTO } from './searchMemes'

export async function getRelatedMemes(id: string): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      `/memes/${encodeURIComponent(id)}/related`,
  )
  const memesData: MemeDTO[] = await response.json()

  return memesData.map((memeData) => map(memeData))
}

function map(entity: MemesDataDTO): Meme {
  return {
    id: entity.id,
    title: entity.title,
    image: {
      width: entity.image.width,
      height: entity.image.height,
      url: entity.image.url,
    },
    tags: [...entity.tags],
  }
}
