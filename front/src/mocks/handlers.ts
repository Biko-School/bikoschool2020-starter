import { rest } from 'msw'
import memes from '../fixtures/memes.json'
import meme from '../fixtures/memeGet.json'
import memeWuser from '../fixtures/memeWAuthor.json'
import memesSearch from '../fixtures/memes.search.json'
import { useParams } from 'react-router-dom'
const errorMessage = { "message": "El texto de búsqueda necesita ser mayor que dos caracteres"}
export const handlers = [
  rest.get('/api/memes', (req,res,ctx) =>{
    return res(
        ctx.status(200),
        ctx.json(memes),
      )
  }),
  rest.get('/api/meme/:id', (req,res,ctx) =>{
    interface ParamTypes {
      id: string
    }
    const { id } = useParams<ParamTypes>()

    if (id === '-1') {
      return res(
        ctx.status(200),
        ctx.json(memeWuser),
      )
    }else{
      return res(
        ctx.status(200),
        ctx.json(meme),
      )
    }
    
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