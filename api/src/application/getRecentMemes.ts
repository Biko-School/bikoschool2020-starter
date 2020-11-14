import { theMemesRepository } from './MemesRepository';
import { MemeThumbDTO, mapToMemeThumbDTO } from './MemeThumb.dto';

export function getRecentMemes(num: number): MemeThumbDTO[] {
  return theMemesRepository()
    .getRecents(num)
    .map((meme) => mapToMemeThumbDTO(meme));
}
