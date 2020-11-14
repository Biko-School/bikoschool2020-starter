import { Meme } from '../domain/Meme.entity';
import { theMemesRepository } from './MemesRepository';

export function getMemesBySearchTerm(searchTerm: string): Meme[] {
  searchTerm = searchTerm.trim().replace(/\s+/, ' '); // normalize spaces
  searchTerm = searchTerm.toLowerCase();
  if (searchTerm.length < 3) {
    throw new Error(
      'El término de búsqueda debe contener al menos 3 caracteres.',
    );
  }
  return theMemesRepository().getByPartialTagMatch(searchTerm);
}
