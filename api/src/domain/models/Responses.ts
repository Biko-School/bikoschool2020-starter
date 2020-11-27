import { MemeThumbnail } from './MemeThumbnail'

export interface MemeResponse {
  memes: MemeThumbnail[]
}
export interface ErrorResponse {
  status: number
  message: string
}
