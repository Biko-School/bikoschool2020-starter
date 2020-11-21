import { memeLowDbToMeme } from 'core/infrastructure/MemeLowDbToMemeMapper'
import { MemeResponse } from '../../core/domain/MemeResponse'
import { MemeDb } from '../../core/infrastructure/model/MemeDb'
//const memeA = aMeme().withDate(Date.now()).build()
//const memeB = aMeme2({ import_datetime: Date.now() })

const ORIGINAL_WIDTH = '500'
const ORIGINAL_HEIGHT = '250'
const SMALL_WIDTH = '200'
const SMALL_HEIGHT = '100'
const ORIGINAL_URL = 'http://www.originalurl.com'
const SMALL_URL = 'http://www.smallurl.com'

export function aMemeDb(id: string) {
  let baseMeme: MemeDb = {
    id,
    title: 'irrelevant',
    import_datetime: Date.now().toString(),
    username: 'irrelevant',
    images: {
      original: {
        width: ORIGINAL_WIDTH,
        height: ORIGINAL_HEIGHT,
        url: ORIGINAL_URL,
      },
      small: {
        width: SMALL_WIDTH,
        height: SMALL_HEIGHT,
        url: SMALL_URL,
      },
    },
    tags: ['#foo'],
  }
  return {
    withDate(date: string) {
      baseMeme.import_datetime = date
      return this
    },
    withTags(tags: string[]) {
      baseMeme.tags = tags
      return this
    },
    build(): MemeDb {
      return baseMeme
    },
  }
}

export function aMemeResponse(id: string) {
  let baseMeme: MemeResponse = {
    id,
    title: 'irrelevant',
    date: Date.now().toString(),
    url: SMALL_URL,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
    tags: ['#foo'],
  }
  return {
    withDate(date: string) {
      baseMeme.date = date
      return this
    },
    withTags(tags: string[]) {
      baseMeme.tags = tags
      return this
    },
    build(): MemeResponse {
      return baseMeme
    },
  }
}

// export function aMeme2(newValues: Partial<MemeDb>) {
//   let defaults: Meme = {
//     id: '',
//     title: 'irrelevant',
//     date: Date.now(),
//   }
//   let result = {
//     ...defaults,
//     ...newValues,
//   }
//   let result2 = Object.assign(defaults, newValues)
//   return result
// }
