import express, { Request, Response } from 'express'
import logger from 'morgan'

export const app = express()

// Shows request log on terminal
// https://github.com/expressjs/morgan
if (app.get('env') !== 'test') app.use(logger('combined'))

// Parses incoming requests with JSON payloads
// http://expressjs.com/es/api.html#express.json
app.use(express.json())

// Parses incoming requests with urlencoded payloads
// http://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }))

//Router
const router = express.Router()
app.use('/api', router)

router.get('/memes', (req: Request, res: Response) => {
  res.json([{ data: 'index!' }])
})
