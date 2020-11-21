export interface DatabaseSchema {
  memes: MemeDatabase[]
}
export interface AuthorMemeDatabase {
  avatar_url: string
  banner_image: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  is_verified: boolean
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
  user?: AuthorMemeDatabase
}
