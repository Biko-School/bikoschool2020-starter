import { MemeDetail } from './models/MemeDetail'

interface MemeDetailDTO {
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
    name: string
  }
}

export async function getMemeDetail(id: string): Promise<MemeDetail> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      '/memes/' +
      encodeURIComponent(id),
  )
  const memeDetailDTO: MemeDetailDTO = await response.json()
  return memeDetailDTO
}
