import { Meme } from 'core/domain/meme/Meme'

export interface MemeRepository {
  getAll: () => Promise<Meme[]>
  getAllByTag: (tag: string) => Promise<Meme[]>
}
