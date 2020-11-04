import { MemeDB } from 'DatabaseSchema'

export default function aMeme(partialMeme: Partial<MemeDB>): MemeDB {
  const defaultMeme: MemeDB = {
    id: '1',
    type: 'irrelevant',
    slug: 'irrelevant',
    giphyUrl: 'irrelevant',
    title: 'Heat Wave 80S GIF',
    source_tld: 'irrelevant',
    source_post_url: 'irrelevant',
    import_datetime: '2020-08-22T00:24:22.000Z',
    username: 'irrelevant',
    images: {
      original: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      small: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
    },
    tags: ['#movie', '#brazil', '#brazil the movie'],
  }
  let result: MemeDB = {
    ...defaultMeme,
    ...partialMeme,
  }
  return result
}
