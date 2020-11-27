export interface AuthorMemeSchema {
  avatar_url: string
  banner_image: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  is_verified: boolean
}

export interface MemeSchema {
  import_datetime: string
  id: string
  title: string
  images: {
    original: {
      width: string
      height: string
      url: string
    }
    small: {
      width: string
      height: string
      url: string
    }
  }
  tags: string[]
  user?: AuthorMemeSchema
}
