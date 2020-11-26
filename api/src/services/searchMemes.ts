import { MemeThumbnail } from './../models/MemeThumbnail'
import { mapMemesSchemaToMemesThumbnail } from './mappers'
import { MemesRepository } from './../models/MemesRepository'

interface options {
  searchTerm: string
}

export const searchMemes = (
  memesRepository: MemesRepository,
  { searchTerm }: options,
): MemeThumbnail[] => {
  const query = normalizeSearchTerm(searchTerm)
  if (query.length < 3) {
    throw new Error('The search term should 3 or more characters')
  }
  return memesRepository.searchMemes(query).map(mapMemesSchemaToMemesThumbnail)
}

const normalizeSearchTerm = (searchTerm: string): string => {
  const words: string[] = searchTerm.trim().split(' ').filter(Boolean)
  return words.join(' ').toLocaleLowerCase()
}
