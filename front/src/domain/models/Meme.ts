export interface Meme {
  id: string
  title: string
  imageUrl: string
  tags: string[]
  user?: {
    url: string
    name: string
  }
}
