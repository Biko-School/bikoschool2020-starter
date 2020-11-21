import { Meme } from 'Domain/models/Meme'

export interface MemeRepository {
  getTrendingMemes(): Meme[]
  searchMemes(filter: string): Meme[]
}
