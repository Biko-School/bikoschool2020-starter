import { Meme } from '../domain/Meme.entity';

let repository: MemesRepository;

export interface MemesRepository {
  getRecents(num: number): Meme[];
  getByPartialTagMatch(searchTerm: string): Meme[];
}

export function setMemesRepository(repo: MemesRepository) {
  repository = repo;
}

export function theMemesRepository(): MemesRepository {
  return repository;
}
