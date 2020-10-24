export interface DatabaseSchema {
  memes: MemeDatabase[]
}
export interface MemeDatabase {
  import_datetime: string
  id: string
  title: string
  images: {
    small: {
      width: string
      height: string
      url: string
    }
  }
  tags: string[]
}
