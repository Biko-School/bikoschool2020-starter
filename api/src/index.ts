import http from 'http'
import express, { Request, Response } from 'express'
import logger from 'morgan'
import {createApp} from './app'
import FileSync from 'lowdb/adapters/FileSync'
import low from 'lowdb'


// Routes every path
// app.use('/', (req: Request, res: Response) => {
//   res.json({data: "index!"})
// })

const adapter = new FileSync('./db/db.json') 

const db = low(adapter)

var server = http.createServer(createApp(db))
var port = process.env.PORT || '3333'

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
