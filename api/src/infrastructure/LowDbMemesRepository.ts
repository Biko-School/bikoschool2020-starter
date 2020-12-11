import { MemesRepository } from '../application/MemesRepository';
import { Meme } from '../domain/Meme.entity';
import Lowdb from 'lowdb';
import { DbSchema, MemeDb } from './dbSchema';

export class LowDbMemesRepository implements MemesRepository {
  constructor(private db: Lowdb.LowdbSync<DbSchema>) {}

  toMemeDomainEntity(memeDb: MemeDb): Meme {
    return {
      id: memeDb.id,
      title: memeDb.title,
      datetime: memeDb.import_datetime,
      images: {
        original: memeDb.images.original,
        small: memeDb.images.small,
      },
      author: memeDb.username,
      tags: memeDb.tags.map((tag) => tag.slice(1)),
    };
  }

  getRecents(num: number): Meme[] {
    const recentMemesFromDb: Array<MemeDb> = this.db
      .get('memes')
      .orderBy('import_datetime', 'desc')
      .take(num)
      .value();
    return recentMemesFromDb.map(this.toMemeDomainEntity);
  }

  getByPartialTagMatch(searchTerm: string): Meme[] {
    const searchResultsFromDb: Array<MemeDb> = this.db
      .get('memes')
      .filter((meme) => {
        const tagsMatch = meme.tags.filter((tag) =>
          tag.slice(1).toLowerCase().includes(searchTerm),
        );
        return tagsMatch.length > 0;
      })
      .orderBy('import_datetime', 'desc')
      .value();
    return searchResultsFromDb.map(this.toMemeDomainEntity);
  }

  getById(id: string): Meme | false {
    const memeFromDb: MemeDb = this.db.get('memes').find({ id: id }).value();
    if (memeFromDb === undefined) {
      return false;
    }
    return this.toMemeDomainEntity(memeFromDb);
  }
}
