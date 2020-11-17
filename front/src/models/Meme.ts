export interface Meme {
  title: string
  id: string
  url: string
  author?: {
    displayName: string,
    avatarUrl: string
  } 
}
