import { MemeThumbnail } from '../domain/models/MemeThumbnail'
import { mapMemesSchemaToMemesThumbnail } from './mappers'
import { MemesRepository } from '../domain/models/MemesRepository'
import { orderBy  } from "lodash"
import { InvalidSearchTermException } from './../domain/exceptions'

interface options {
  searchTerm: string
}

export const searchMemes = (
  memesRepository: MemesRepository,
  { searchTerm: originSearchTerm }: options,
): MemeThumbnail[] => {
  const searchTerm = normalizeSearchTerm(originSearchTerm)
  if (searchTerm.length < 3) {
    throw new InvalidSearchTermException(searchTerm, 'must have 3 or more characters')
  }

  const memesAll = memesRepository.getAll()
  const memeMatched = memesAll.filter( meme => meme.tags.some((tag) => tag.includes(searchTerm)))
  const memesMatchedSorted = orderBy(memeMatched, ['import_datetime'], ['desc'])
  return memesMatchedSorted.map(mapMemesSchemaToMemesThumbnail)
}

const normalizeSearchTerm = (searchTerm: string): string => {
  const words: string[] = searchTerm.trim().split(' ').filter(Boolean)
  return words.join(' ').toLocaleLowerCase()
}
