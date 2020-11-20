export interface MemeDetail {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  tags: string[]
  user: {
    avatar_url: string
    name: string
  }
}
