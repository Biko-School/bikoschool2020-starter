import { MemeDB } from 'DatabaseSchema'

export default function aMeme(partialMeme: Partial<MemeDB>): MemeDB {
  const defaultMeme: MemeDB = {
    id: '1',
    type: 'irrelevant',
    slug: 'irrelevant',
    giphyUrl: 'irrelevant',
    title: 'Don Xabier',
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
    user: {
      avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
      banner_image: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
      banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
      profile_url: 'https://giphy.com/msnbc/',
      username: 'msnbc',
      display_name: 'MSNBC',
      is_verified: true,
    },
  }
  let result: MemeDB = {
    ...defaultMeme,
    ...partialMeme,
  }
  return result
}
