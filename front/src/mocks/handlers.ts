import { rest } from 'msw'
import memes from '../fixtures/memes.json'
import memeDetailWithoutUser from '../fixtures/memeDetailWithoutUser.json'
import memeDetailWithUser from '../fixtures/memeDetailWithUser.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(memes))
  }),
  rest.get('http://localhost:3001/api/memes/search', (req, res, ctx) => {
    const filter = decodeURIComponent(
      req.url.searchParams.get('filter') as string,
    )

    if (filter === '#foo') {
      return res(ctx.status(200), ctx.json([memes[0]]))
    } else {
      return res(ctx.status(200), ctx.json([]))
    }
  }),
  rest.get('http://localhost:3001/api/memes/:id', (req, res, ctx) => {
    const { id } = req.params
    if (id === 'YleuWir5NTNVXkflSp') {
      return res(ctx.status(200), ctx.json(memeDetailWithoutUser))
    } else if (id == 'XEbIyyo02CsFyDmFXL') {
      return res(ctx.status(200), ctx.json(memeDetailWithUser))
    }
  }),
]
