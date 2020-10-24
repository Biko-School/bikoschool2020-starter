import { Meme } from '../../schemas/Meme'
//const memeA = aMeme().withDate(Date.now()).build()
//const memeB = aMeme2({ import_datetime: Date.now() })

export function aMeme(id: string) {
  let baseMeme: Meme = {
    id,
    title: 'irrelevant',
    import_datetime: Date.now().toString(),
    username: 'irrelevant',
    images: {
      original: {
        width: '500',
        height: '200',
        url: 'irrelevant',
      },
      small: {
        width: '200',
        height: '100',
        url: 'irrelevant',
      },
    },
    tags: ['#foo'],
  }
  return {
    withDate(date: string) {
      baseMeme.import_datetime = date
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

// export function aMeme2(newValues: Partial<MemeDb>) {
//   let defaults: Meme = {
//     id: '',
//     title: 'irrelevant',
//     date: Date.now(),
//   }
//   let result = {
//     ...defaults,
//     ...newValues,
//   }
//   let result2 = Object.assign(defaults, newValues)
//   return result
// }
