import http from 'http'
import express, { Request, Response } from 'express'
import logger from 'morgan'
import app from './app'


// Routes every path
// app.use('/', (req: Request, res: Response) => {
//   res.json({data: "index!"})
// })

app.set('port', port)

var server = http.createServer(app)
var port = process.env.PORT || '3000'

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
