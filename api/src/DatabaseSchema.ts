export interface DatabaseSchema {
  memes: DbMeme[]
}
interface DbMeme {
  import_datetime: Date
}

export interface Meme {
  creationDate: Date
}
