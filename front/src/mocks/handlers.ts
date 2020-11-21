import { rest } from 'msw'
import memes from '../fixtures/memes.json'
import memesSearch from '../fixtures/memes.search.json'

export const handlers = [
  rest.get('/api/memes', (req,res,ctx) =>{
    return res(
        ctx.status(200),
        ctx.json(memes),
      )
  }),
  rest.get('/api/memes/search', (req,res,ctx) =>{
    return res(
        ctx.status(200),
        ctx.json(memesSearch),
      )
  }),
]