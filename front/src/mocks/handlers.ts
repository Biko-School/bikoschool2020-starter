// src/mocks/handlers.js
import { rest } from 'msw'
import Memes from '../fixtures/dbSampleMemes.json'
import SearchMemes from '../fixtures/dbMemesSearchResult.json'
import MemeDetail from '../fixtures/dbSampleMemeDetail.json'

export const handlers = [
  rest.get(process.env.REACT_APP_API_BASE_URL + '/memes', (req, res, ctx) => {
    const search = req.url.searchParams.get('search')

    if (search) {
      return res(ctx.status(200), ctx.json(SearchMemes))
    }
    //Return a mocked memes list
    return res(ctx.status(200), ctx.json(Memes))
  }),

  rest.get(process.env.REACT_APP_API_BASE_URL + '/meme', (req, res, ctx) => {
    const id = req.url.searchParams.get('id')
    if (id) {
      return res(ctx.status(200), ctx.json(MemeDetail))
    }
    return res(ctx.status(404))
  }),
]
