import { rest } from 'msw'
import memes from '../fixtures/memes.json'
import memesSearch from '../fixtures/memes.search.json'
const errorMessage = { "message": "El texto de búsqueda necesita ser mayor que dos caracteres"}
export const handlers = [
  rest.get('/api/memes', (req,res,ctx) =>{
    return res(
        ctx.status(200),
        ctx.json(memes),
      )
  }),
  rest.get('/api/memes/search', (req,res,ctx) =>{
    let tag = req.url.searchParams.get('query')
    if(tag === null) tag = ""
    if(tag.length < 3){
      return res(
        ctx.status(401),
        ctx.json(errorMessage),
      )
    } else {
      return res(
        ctx.status(200),
        ctx.json(memesSearch),
      )
    }

  }),

]