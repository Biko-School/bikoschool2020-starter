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
}
