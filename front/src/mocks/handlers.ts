import { rest } from 'msw'
import recents from '../fixture/recent.json'
import searchMovieResult from '../fixture/search_movie.json'
import details from '../fixture/details.json'

export const handlers = [
  rest.get('http://localhost:5000/api/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recents))
  }),
  rest.get('http://localhost:5000/api/memes/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchMovieResult))
  }),
  rest.get('http://localhost:5000/api/meme/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(details))
  }),
]
