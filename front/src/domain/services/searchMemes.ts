import { Meme } from '../models/Meme'

export interface MemesDTO {
  id: string
  title: string
  image_url: string
  date: string
  tags: string[]
}

export async function getFilteredMemes(tag: string): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      '/memes/search?filter=' +
      encodeURIComponent(tag),
  )
  const memesData: MemesDTO[] = await response.json()

  return memesData.map((memeData) => map(memeData))
}

function map(entity: MemesDTO): Meme {
  return {
    id: entity.id,
    title: entity.title,
    imageUrl: entity.image_url,
    tags: [...entity.tags],
  }
}
