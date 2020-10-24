export interface DatabaseSchema {
  memes: Meme[]
}

interface Meme {
  title: string
  id: string
  images: {
    original: {
      url: string
    }
  }
  import_datetime: string
}
