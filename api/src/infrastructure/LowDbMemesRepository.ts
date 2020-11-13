import { MemesRepository } from '../application/MemesRepository';
import { Meme } from '../domain/Meme.entity';
import Lowdb from 'lowdb';
import { DbSchema, MemeDb } from './dbSchema';

export class LowDbMemesRepository implements MemesRepository {
  constructor(private db: Lowdb.LowdbSync<DbSchema>) {}

  toMemeDomainEntity(memesDb: MemeDb[]) {
    return memesDb.map((memeDb) => ({
      id: memeDb.id,
      title: memeDb.title,
      datetime: memeDb.import_datetime,
      images: {
        original: memeDb.images.original,
        small: memeDb.images.small,
      },
      tags: memeDb.tags,
    }));
  }

  getRecents(num: number): Meme[] {
    const recentMemesFromDb: Array<MemeDb> = this.db
      .get('memes')
      .orderBy('import_datetime', 'desc')
      .take(num)
      .value();
    return this.toMemeDomainEntity(recentMemesFromDb);
  }

  getByPartialTagMatch(searchTerm: string): Meme[] {
    const searchResultsFromDb: Array<MemeDb> = this.db
      .get('memes')
      .filter((meme) => {
        const tagsMatch = meme.tags.filter((tag) =>
          tag.toLowerCase().includes(searchTerm),
        );
        return tagsMatch.length > 0;
      })
      .orderBy('import_datetime', 'desc')
      .value();
    return this.toMemeDomainEntity(searchResultsFromDb);
  }
}
