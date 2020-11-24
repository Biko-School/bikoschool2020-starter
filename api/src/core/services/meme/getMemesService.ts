import { Meme } from 'core/domain/meme/Meme'
import { LowDbMemeRepository } from '../../infrastructure/meme/LowDbMemeRepository'
import { MemeRepository } from 'core/infrastructure/meme/MemeRepository'
import { DatabaseSchema, MemeDB } from 'DatabaseSchema'
import Lowdb from 'lowdb'

export class getMemesService {
  repository: MemeRepository

  constructor(db: Lowdb.LowdbSync<DatabaseSchema>) {
    this.repository = new LowDbMemeRepository(db)
  }

  async getAllMemes(): Promise<Meme[]> {
    return await this.repository.getAll()
  }

  async getAllMemesByTag(tag: string): Promise<Meme[]> {
    return await this.repository.getAllByTag(tag)
  }
}
