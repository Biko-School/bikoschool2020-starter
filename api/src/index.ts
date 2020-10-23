import http from 'http'
import low from 'lowdb'
import { createApp } from './app'
import FileSync from 'lowdb/adapters/FileSync'
import {DatabaseSchema} from 'DatabaseSchema'

var port = process.env.PORT || '3000'

const adapter = new FileSync<DatabaseSchema>('./db/db.json')
const db = low(adapter)

const app = createApp(db)

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
