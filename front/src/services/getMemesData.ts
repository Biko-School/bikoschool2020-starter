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
}

export async function getMemesData(): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) + '/memes',
  )
  const memesData: MemesDataDTO[] = await response.json()
  let mappedMemes = []
  for (let meme of memesData) {
    mappedMemes.push(map(meme))
  }
  return mappedMemes
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
    date: new Date(entity.date),
  }
}
