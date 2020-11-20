// src/mocks/handlers.js
import { rest } from 'msw'
import Memes from '../memes.json'

export const handlers = [
  rest.get(process.env.REACT_APP_API_BASE_URL + '/memes', (req, res, ctx) => {
    const search = req.url.searchParams.get('search')

    if (search) {
      return res(ctx.status(200), ctx.json([Memes[0], Memes[1]]))
    }
    //Return a mocked memes list
    return res(ctx.status(200), ctx.json(Memes))
  }),
]
