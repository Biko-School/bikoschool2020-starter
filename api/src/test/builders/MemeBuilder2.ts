import { MemeSchema } from 'databaseSchema'

export function aMeme(id: string) {
  let defaults : MemeSchema = {
    id,
    title: 'irrelevant',
    images: {
      small: {
        width: '200',
        height: '100',
        url: 'irrelevant',
      },
      original: {
        width: '200',
        height: '100',
        url: 'irrelevant',
      },
    },
    tags: ['#foo'],

    import_datetime: 'irrelevant',
    username: 'irrelevant',
    type: 'irrelevant',
    slug: 'irrelevant',
    giphyUrl: 'irrelevant',
    source_tld: 'irrelevant',
    source_post_url: 'irrelevant'
  }

  return {
    withTags(tags: string[]) {
      defaults.tags = tags
      return this
    },
    withDate(date: string) {
      defaults.import_datetime  = date
      return this
  },
    build() {
      return defaults
    },
  }
}