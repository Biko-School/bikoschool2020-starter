export interface DatabaseSchema {
  memes: Meme[]
}

export interface Meme {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  date: Date
}
