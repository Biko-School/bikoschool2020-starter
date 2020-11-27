import { MemeThumbnail } from '../domain/models/MemeThumbnail'
import { mapMemesSchemaToMemesThumbnail } from './mappers'
import { MemesRepository } from '../domain/models/MemesRepository'
import { orderBy } from "lodash";

interface options {
  numRecentMemes: number
}
export const getRecentMemes = (
  memesRepository: MemesRepository,
  { numRecentMemes }: options,
): MemeThumbnail[] => {
  const allMemes = memesRepository.getAll()
  const recentMemesSorted = orderBy(allMemes, ['import_datetime'], ['desc']).slice(0, numRecentMemes)
  return recentMemesSorted.map(mapMemesSchemaToMemesThumbnail)
}
