// src/mocks/handlers.js
import { rest } from 'msw'
import Memes from '../memes.json'

export const handlers = [
  rest.get('http://localhost:3000/api/memes', (req, res, ctx) => {
    // Return a mocked memes list
    return res(ctx.status(200), ctx.json(Memes))
  }),
]
