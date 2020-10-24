import { rest } from 'msw'
import recents from '../fixture/recent.json'
import searchMovieResult from '../fixture/search_movie.json'

export const handlers = [
  rest.get('http://localhost:5000/api/memes', (req, res, ctx) => {
    const search = req.url.searchParams.get('search')
    if (search === 'movie') {
      return res(ctx.status(200), ctx.json(searchMovieResult))
    }
    return res(ctx.status(200), ctx.json(recents))
  }),
]
