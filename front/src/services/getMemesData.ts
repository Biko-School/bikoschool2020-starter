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

export async function getFilteredMemesData(tag: string): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) + '/memes/' + encodeURIComponent(tag),
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
    tags: [...entity.tags]
  }
}
