import { MemesRepository } from './domain/models/MemesRepository'
import { DatabaseSchema } from './domain/models/DatabaseSchema'
import { AppConfig } from './app'

interface Context {
  memesRepository: MemesRepository
  config: AppConfig
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
