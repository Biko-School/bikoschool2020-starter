export default interface DatabaseSchema {
  memes: Meme[]
}

interface Meme {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
}
