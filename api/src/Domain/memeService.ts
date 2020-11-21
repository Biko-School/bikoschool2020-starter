import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import Lowdb from 'lowdb'
import { MemeServicePort } from './MemeServicePort'

export class MemeService implements MemeServicePort {
  private db: Lowdb.LowdbSync<DatabaseSchema>

  constructor(db: Lowdb.LowdbSync<DatabaseSchema>) {
    this.db = db
  }
  getTrendingMemes(): MemeSchema[] {
    return this.db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(50)
      .value()
  }
}
