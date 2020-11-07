export interface DatabaseSchema {
  memes: MemeDB[]
}

export interface MemeDB {
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
  tags: Array<string>
  user?: {
    avatar_url: string
    banner_image: string
    banner_url: string
    profile_url: string
    username: string
    display_name: string
    is_verified: boolean
  }
}
