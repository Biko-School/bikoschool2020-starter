import { Meme } from 'Domain/models/Meme'
import { MemeDetail } from 'Domain/models/MemeDetail'

export interface MemeRepository {
  getTrendingMemes(): Meme[]
  searchMemes(filter: string): Meme[]
  getMemeDetail(id: string): MemeDetail
  getMemesWithTags(tags: string[]): Meme[]
}
