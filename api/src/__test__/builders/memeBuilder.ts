import { MemeDatabase } from 'DatabaseSchema'

export function aMeme(id: string) {
  let baseMeme: MemeDatabase = {
    id,
    import_datetime: 'irrelevant',
    title: 'irrelevant',
    images: {
      small: {
        width: '200',
        height: '100',
        url: 'irrelevant',
      },
    },
    tags: ['#foo'],
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
    build() {
      return baseMeme
    },
  }
}
