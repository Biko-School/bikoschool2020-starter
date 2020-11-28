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

  getAllMemes(): Meme[] {
    return this.repository.getAll()
  }

  getAllMemesByTag(tag: string): Meme[] {
    return this.repository.getAllByTag(tag)
  }
}
