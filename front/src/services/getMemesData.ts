import { FetchRepository } from '../infrastructure/repositories/FetchRepository'
import { Meme } from '../Meme'

const apiClient = new FetchRepository()

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
  user?: {
    avatar_url: string
    banner_image: string
    banner_url: string
    profile_url: string
    username: string
    display_name: string
    is_verified: boolean
  }
}

export async function getMemesData(): Promise<Meme[]> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) + '/memes',
  )
  const memesData: MemesDataDTO[] = await response.json()
  let mappedMemes: Meme[] = []
  for (let meme of memesData) {
    mappedMemes.push(map(meme))
  }
  return mappedMemes
}

export async function searchMemeByText(queryText: string): Promise<Meme[]> {
  const mappedMemes: Meme[] = []

  const memesData = await apiClient.get<MemesDataDTO[]>('/memes/' + queryText)

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
    tags: entity.tags,
    user: entity.user,
  }
}
