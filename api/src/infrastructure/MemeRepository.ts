import { Meme } from 'Meme'

export interface MemeRepository {
  getTrendingMemes(): Meme[]
}
