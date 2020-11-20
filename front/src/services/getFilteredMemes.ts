import { Meme } from '../Meme'

export interface MemesDataDTO {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  date: string
  tags: string[]
}

export async function getFilteredMemes(tag: string): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      '/memes/search?filter=' +
      encodeURIComponent(tag),
  )
  const memesData: MemesDataDTO[] = await response.json()

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
