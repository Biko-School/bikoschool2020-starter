import { rest } from 'msw'
import memes from './../fixtures/memes.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(memes))
  }),
  rest.get('http://localhost:3001/api/memes/search', (req, res, ctx) => {
    const filter = req.url.searchParams.get('filter') as string
    
    const filteredMemes = memes.filter(meme => meme.tags.includes(filter))
    return res(ctx.status(200), ctx.json(filteredMemes))
  }),
]
