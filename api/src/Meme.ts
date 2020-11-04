export interface Meme {
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
