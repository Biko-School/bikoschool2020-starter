import Lowdb from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
import { DbSchema, MemeDb } from '../infrastructure/dbSchema';
import { MemesRepository } from 'application/MemesRepository';
import { LowDbMemesRepository } from '../infrastructure/LowDbMemesRepository';

export const aMemesRepo = function () {
  return {
    fromJSON(jsonFilename: string): MemesRepository {
      const db = Lowdb(new Memory<DbSchema>(''));
      const jsonData = require(jsonFilename);
      db.defaults(jsonData).write();
      return new LowDbMemesRepository(db);
    },

    fromMemory(memes: MemeDb[]): MemesRepository {
      const db = Lowdb(new Memory<DbSchema>(''));
      db.defaults({ memes: memes }).write();
      return new LowDbMemesRepository(db);
    },
  };
};

export function aMeme(id: string) {
  const memeDb: MemeDb = {
    id: id,
    type: 'gif',
    slug: `slug-${id}`,
    giphyUrl: 'irrelevant',
    title: 'irrelevant',
    source_tld: '',
    source_post_url: '',
    import_datetime: '1900-01-01 00:00:00',
    username: 'irrelevant',
    images: {
      original: {
        width: 0,
        height: 0,
        url: 'irrelevant',
      },
      small: {
        width: 0,
        height: 0,
        url: 'irrelevant',
      },
    },
    tags: [],
  };

  return {
    withDate(date: string) {
      memeDb.import_datetime = date;
      return this;
    },
    withTags(tags: string[]) {
      memeDb.tags = tags.map((tag) => `#${tag}`);
      return this;
    },
    build() {
      return memeDb;
    },
  };
}
