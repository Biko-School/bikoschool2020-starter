import { MemeRepository } from 'infrastructure/MemeRepository'
import { Meme } from 'Domain/models/Meme'
import { MemeServicePort } from './MemeServicePort'
import { MemeDetail } from './models/MemeDetail'

export class MemeService implements MemeServicePort {
  private memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }
  getTrendingMemes(): Meme[] {
    return this.memeRepository.getTrendingMemes()
  }
  searchMemes(filter: string): Meme[] {
    const trimmedFilter = filter.trim().replace(/\s+/g, ' ')
    if (trimmedFilter.length < 3) {
      throw 'minimun_length_error'
    }

    return this.memeRepository.searchMemes(trimmedFilter)
  }

  getMemeDetail(id: string): MemeDetail {
    return this.memeRepository.getMemeDetail(id)
  }

  getRelatedMemes(id: string): Meme[] {
    const meme = this.getMemeDetail(id)
    const memesWithTags = this.memeRepository.getMemesWithTags(meme.tags)
    const relatedMemes = memesWithTags.filter((item) => item.id !== meme.id)
    return relatedMemes
  }
}
