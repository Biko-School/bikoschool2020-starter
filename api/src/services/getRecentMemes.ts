import { MemeThumbnail } from "./../models/MemeThumbnail"
import { mapMemesDtoToMemesThumbnail } from "./mappers"
import { MemesRepository } from "./../models/MemesRepository"

interface options {
     numRecentMemes: number
}
export const getRecentMemes = (memesRepository: MemesRepository, {numRecentMemes}: options): MemeThumbnail[] => {
     return memesRepository.getRecentMemes({numRecentMemes}).map(mapMemesDtoToMemesThumbnail);
}