import { MemeRepository } from 'infrastructure/MemeRepository'
import { Meme } from 'Meme'
import { MemeServicePort } from './MemeServicePort'

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
}
