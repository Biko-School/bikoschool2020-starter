import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import { Meme } from 'Meme'

export interface MemeServicePort {
  getTrendingMemes(): Meme[]
}
