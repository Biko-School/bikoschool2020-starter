export interface Meme {
  id: string
  title: string
  image: {
    width: string
    height: string
    url: string
  }
  date: string
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
