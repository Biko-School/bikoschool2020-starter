import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from './DatabaseSchema'

export const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
  process.env.NODE_ENV === 'test'
    ? new Memory<DatabaseSchema>('')
    : new FileSync<DatabaseSchema>('./src/db/db.json'),
)
