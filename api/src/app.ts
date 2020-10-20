import express, { Request, Response } from 'express'
import logger from 'morgan'

const app = express()

// Shows request log on terminal
// https://github.com/expressjs/morgan
app.use(logger('combined'))

// Parses incoming requests with JSON payloads
// http://expressjs.com/es/api.html#express.json
app.use(express.json())

// Parses incoming requests with urlencoded payloads
// http://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }))

app.get('/api/memes',function(req,res){
    res.status(200).send(new Array())
})

export default app