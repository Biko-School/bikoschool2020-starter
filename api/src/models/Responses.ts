import { Meme } from './Meme'

export interface MemeResponse {
  memes: Meme[]
}
export interface ErrorResponse {
  status: number
  message: string
}
