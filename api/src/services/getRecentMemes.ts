import { MemeThumbnail } from "./../models/MemeThumbnail"
import { mapMemesDtoToMemesThumbnail } from "./mappers"
import { MemesRepository } from "./../models/MemesRepository"

export const getRecentMemes = (memesRepository: MemesRepository, {numRecentMemes}): MemeThumbnail[] => {
     return memesRepository.getRecentMemes({numRecentMemes}).map(mapMemesDtoToMemesThumbnail);
}