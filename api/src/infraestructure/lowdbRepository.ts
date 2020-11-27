import { MemesRepository } from './../models/MemesRepository'
import { MemeSchema } from '../models/MemeSchema'
import { DatabaseSchema } from './../models/DatabaseSchema'
import Lowdb from 'lowdb'

export class LowDbMemesRepository implements MemesRepository {
  constructor(private db: Lowdb.LowdbSync<DatabaseSchema>) {}

  getById(id: string): MemeSchema {
    return this.db
      .get('memes')
      .find({ id })
      .value()
  }

  getAll() {
      return this.db.get('memes').value()
  }
}
