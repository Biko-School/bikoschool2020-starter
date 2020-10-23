export interface DatabaseSchema {
  memes: DbMeme[]
}
interface DbMeme {
  import_datetime: Date
  id: string
  title: string
  images: ImagesMeme
}

interface ImagesMeme {
  small: {
    url: string
  }
}
export interface Meme {
  id: string
  title: string
  url: string
  creationDate: Date
}
