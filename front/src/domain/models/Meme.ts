export interface Meme {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  tags: string[]
}
