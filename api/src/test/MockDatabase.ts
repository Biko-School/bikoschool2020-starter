import lowdb, { LowdbSync } from 'lowdb'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from 'databaseSchema'

export function mockDatabaseWithData(
  data: DatabaseSchema,
): LowdbSync<DatabaseSchema> {
  const adapter = new Memory<DatabaseSchema>('')
  const db = lowdb(adapter)
  db.defaults(data).write()

  return db
}