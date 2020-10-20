import http from 'http'
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

// Routes every path
app.use('/', (req: Request, res: Response) => {
  res.json({ data: 'index!' })
})

var port = process.env.PORT || '3000'
app.set('port', port)

var server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  console.log(`Listening on port ${port}`)
}
