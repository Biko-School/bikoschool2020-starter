export interface MemeThumbnail {
  id: string
  title: string
  url: string
  creationDate: string
  author?: {
    displayName: string
    avatarUrl: string
  }
}
