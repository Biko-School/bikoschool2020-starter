import { MemeDatabase, AuthorMemeDatabase } from 'models/DatabaseSchema'

export function aMeme(id: string) {
  let baseMeme: MemeDatabase = {
    id,
    import_datetime: 'irrelevant',
    title: 'irrelevant',
    images: {
      original: {
        width: '480',
        height: '400',
        url: 'irrelevant'
      },
      small: {
        width: '200',
        height: '100',
        url: 'irrelevant',
      },
    },
    tags: ['irrelevant'],
  }

  return {
    withDate(datetime: string) {
      baseMeme.import_datetime = datetime
      return this
    },
    withTags(tags: string[]) {
      baseMeme.tags = tags
      return this
    },
    withAuthor(author: AuthorMemeDatabase) {
      baseMeme.user = author
      return this
    },
    build() {
      return baseMeme
    },
  }
}
