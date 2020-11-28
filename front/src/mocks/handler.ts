import { rest } from 'msw'
import db from '../db.json'

export const handlers = [
    rest.get('http://localhost:3333/api/memes', (req, res, ctx) => {
      const search = req.url.searchParams.get('search')
      if(search){
        return res(
          ctx.status(200),
          ctx.json(db.memes.splice(0, 1))
        )
      }else{
        return res(
          ctx.status(200),
          ctx.json(db.memes.splice(0, 10))
        )
      }
    }),
    
  ]