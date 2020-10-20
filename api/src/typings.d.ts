import { DatabaseSchema } from './databaseSchema'
import { LowdbSync } from 'lowdb'

interface Context {
  db: LowdbSync<DatabaseSchema>
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
