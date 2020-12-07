import { Meme } from '../models/Meme'

export interface MemeDTO {
  id: string
  title: string
  image_url: string
  date: string
  tags: string[]
  user?: {
    url: string
    name: string
  }
}

export async function getTrendingMemes(): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) + '/memes',
  )
  const memesData: MemeDTO[] = await response.json()

  return memesData.map((memeData) => map(memeData))
}

function map(entity: MemeDTO): Meme {
  return {
    id: entity.id,
    title: entity.title,
    imageUrl: entity.image_url,
    tags: [...entity.tags],
    ...(entity.user && { user: entity.user }),
  }
}
