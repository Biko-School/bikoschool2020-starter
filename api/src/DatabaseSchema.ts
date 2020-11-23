export interface DatabaseSchema {
  memes: MemeSchema[]
}

export interface MemeSchema {
  id: string
  type: string
  slug: string
  giphyUrl: string
  title: string
  source_tld: string
  source_post_url: string
  import_datetime: string
  username: string
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
  user?: MemeUserSchema
}

export interface MemeUserSchema {
  avatar_url: string
  banner_image: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  is_verified: string
}
