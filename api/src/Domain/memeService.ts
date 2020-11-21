import { DatabaseSchema } from 'DatabaseSchema'
import Lowdb from 'lowdb'

export function getTrendingMemes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  return db.get('memes').sortBy('import_datetime').reverse().take(50).value()
}
