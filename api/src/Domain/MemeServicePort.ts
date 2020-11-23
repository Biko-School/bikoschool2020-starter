import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import { Meme } from 'Domain/models/Meme'
import { MemeDetail } from './models/MemeDetail'

export interface MemeServicePort {
  getTrendingMemes(): Meme[]
  searchMemes(filter: string): Meme[]
  getMemeDetail(id: string): MemeDetail
}
