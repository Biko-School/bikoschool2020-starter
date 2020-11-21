import { Meme } from 'Meme'

export interface MemeRepository {
  getTrendingMemes(): Meme[]
  searchMemes(filter: string): Meme[]
}
