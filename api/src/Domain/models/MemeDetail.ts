export interface MemeDetail {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  tags: string[]
  user?: {
    name: string
    avatar_url: string
  }
}
