import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import { Meme } from 'Domain/models/Meme'

export interface MemeServicePort {
  getTrendingMemes(): Meme[]
  searchMemes(filter: string): Meme[]
}
