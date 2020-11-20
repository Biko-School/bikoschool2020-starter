import { MemeDetail } from '../MemeDetail'

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
  return map(memeDetailDTO)
}

function map(entity: MemeDetailDTO): MemeDetail {
  return {
    id: entity.id,
    title: entity.title,
    image: {
      width: entity.image.width,
      height: entity.image.height,
      url: entity.image.url,
    },
    tags: [...entity.tags],
    user: {
      name: entity.user != undefined ? entity.user.name : '',
      avatar_url: entity.user != undefined ? entity.user.avatar_url : '',
    },
  }
}
