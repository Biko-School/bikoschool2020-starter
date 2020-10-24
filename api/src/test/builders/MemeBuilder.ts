import { Meme } from 'DatabaseSchema'

export default function aMeme(partialMeme: Partial<Meme>): Meme {
  const defaultMeme: Meme = {
    id: '1',
    title: 'Meme ASDF',
    image: {
      width: '200',
      height: '100',
      url: 'http://google.com',
    },
    date: new Date(),
  }
  let result: Meme = {
    ...defaultMeme,
    ...partialMeme,
  }
  return result
}
