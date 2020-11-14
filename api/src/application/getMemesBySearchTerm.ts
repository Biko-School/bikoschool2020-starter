import { theMemesRepository } from './MemesRepository';
import { MemeThumbDTO, mapToMemeThumbDTO } from './MemeThumb.dto';

export function getMemesBySearchTerm(searchTerm: string): MemeThumbDTO[] {
  searchTerm = searchTerm.trim().replace(/\s+/, ' '); // normalize spaces
  searchTerm = searchTerm.toLowerCase();
  if (searchTerm.length < 3) {
    throw new Error(
      'El término de búsqueda debe contener al menos 3 caracteres.',
    );
  }
  return theMemesRepository()
    .getByPartialTagMatch(searchTerm)
    .map((meme) => mapToMemeThumbDTO(meme));
}
