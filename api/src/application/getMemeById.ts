import { Meme } from '../domain/Meme.entity';
import { theMemesRepository } from './MemesRepository';

export function getMemeById(id: string): Meme | false {
  return theMemesRepository().getById(id);
}
