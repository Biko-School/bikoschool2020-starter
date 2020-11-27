import { MemesRepository } from '../domain/models/MemesRepository'
import { MemeSchema } from '../domain/models/MemeSchema'
import { DatabaseSchema } from '../domain/models/DatabaseSchema'
import Lowdb from 'lowdb'

export class LowDbMemesRepository implements MemesRepository {
  constructor(private db: Lowdb.LowdbSync<DatabaseSchema>) {}

  getById(id: string): MemeSchema {
    return this.db
      .get('memes')
      .find({ id })
      .value()
  }

  getAll(): MemeSchema[] {
      return this.db.get('memes').value()
  }
}
