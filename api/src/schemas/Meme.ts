export interface Meme {
  title: string
  id: string
  images: {
    small: {
      width: string
      height: string
      url: string
    }
    original: {
      width: string
      height: string
      url: string
    }
  }
  import_datetime: string
  tags: string[]
  username: string
}
