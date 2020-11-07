import { DbSchema, MemeDb } from '../dbSchema';

export const aDbSchema = function () {
  const dbSchema: DbSchema = {
    memes: [],
  };

  return {
    withMemes(memes: Array<MemeDb>) {
      dbSchema.memes = memes;
      return this;
    },

    build() {
      return dbSchema;
    },
  };
};

export function aMemeDb(id: string) {
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
