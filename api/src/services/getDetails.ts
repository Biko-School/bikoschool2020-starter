import { MemeDetails } from '../domain/models/MemeDetails'
import { mapMemeSchemaToMemeDetails } from './mappers'
import { MemesRepository } from '../domain/models/MemesRepository'
import { MemeDoesNotExistException } from "./../domain/exceptions"

export const getDetails = (
  memesRepository: MemesRepository,
  id: string,
): MemeDetails => {
    const memeSchema = memesRepository.getById(id)
    if (!memeSchema) {
      throw new MemeDoesNotExistException(id);
    }
    return mapMemeSchemaToMemeDetails(memeSchema)
}

