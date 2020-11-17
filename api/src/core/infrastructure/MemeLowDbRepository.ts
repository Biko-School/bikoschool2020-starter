import { MemeRepository } from 'core/domain/MemeRepository'
import Lowdb from 'lowdb'
import { DatabaseSchema } from 'core/infrastructure/model/DatabaseSchema'
import { MemeDb } from 'core/infrastructure/model/MemeDb'
import { MemeResponse } from 'core/domain/MemeResponse'
import { memeLowDbToMeme } from './MemeLowDbToMemeMapper'

let lowDB

const initialize = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  lowDB = db.get('memes')
}

const findRecent = (numberOfMemesToReturn: number) => {
  const memes = lowDB
    .sortBy('import_datetime')
    .reverse()
    .take(numberOfMemesToReturn)
    .value()

  return memes.map(memeLowDbToMeme)
}

export const MemeLowDbRepository: MemeRepository = {
  initialize,
  findRecent,
}
