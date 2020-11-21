import { DatabaseSchema } from './models/DatabaseSchema'
import { LowdbSync } from 'lowdb'
import { AppConfig } from './app'

interface Context {
  db: LowdbSync<DatabaseSchema>
  config: AppConfig
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
