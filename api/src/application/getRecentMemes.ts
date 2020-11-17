import { Meme } from '../domain/Meme.entity';
import { theMemesRepository } from './MemesRepository';

export function getRecentMemes(num: number): Meme[] {
  return theMemesRepository().getRecents(num);
}
