import { Meme } from 'core/domain/meme/Meme'

export interface MemeRepository {
  getAll: () => Meme[]
  getAllByTag: (tag: string) => Meme[]
}
