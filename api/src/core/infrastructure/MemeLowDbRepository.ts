import { MemeRepository } from 'core/domain/MemeRepository'
import Lowdb from 'lowdb'
import { DatabaseSchema } from 'core/infrastructure/model/DatabaseSchema'
import { MemeDb } from 'core/infrastructure/model/MemeDb'
import { memeLowDbToMeme } from './MemeLowDbToMemeMapper'

let lowDB: Lowdb.LowdbSync<DatabaseSchema>

const initialize = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  lowDB = db
}

const filterByTag = (tagFilter: string, numberOfMemesToReturn: number) => {
  return lowDB
    .get('memes')
    .filter((meme: MemeDb): boolean => {
      const tagsIncludingSearchQuery = meme.tags.filter((tag) =>
        tag.toLowerCase().includes(tagFilter),
      )
      return tagsIncludingSearchQuery.length > 0
    })
    .sortBy('import_datetime')
    .reverse()
    .take(numberOfMemesToReturn)
    .value()
}

const findRecent = (numberOfMemesToReturn: number) => {
  const memes = lowDB
    .get('memes')
    .sortBy('import_datetime')
    .reverse()
    .take(numberOfMemesToReturn)
    .value()

  return memes.map(memeLowDbToMeme)
}

export const MemeLowDbRepository: MemeRepository = {
  initialize,
  findRecent,
  filterByTag,
}
