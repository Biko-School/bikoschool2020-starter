export interface Meme {
  id: string
  title: string
  image_url: string
  date: string
  tags: string[]
  user?: {
    name: string
    url: string
  }
}
