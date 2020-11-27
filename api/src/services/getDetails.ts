import { MemeDetails } from './../models/MemeDetails'
import { mapMemeSchemaToMemeDetails } from './mappers'
import { MemesRepository } from './../models/MemesRepository'

export const getDetails = (
  memesRepository: MemesRepository,
  id: string,
): MemeDetails => {
    const memeSchema = memesRepository.getById(id)
    if (!memeSchema) {
        throw new Error(`Meme doesn't exist with ID: ${id}`)
    }
    return mapMemeSchemaToMemeDetails(memeSchema)
}

