import FileSync from 'lowdb/adapters/FileSync'
import http from 'http'
import { createApp } from './app'
import { DatabaseSchema } from './domain/models/DatabaseSchema'
import Lowdb from 'lowdb'
import { LowDbMemesRepository } from './infraestructure/lowdbRepository'

export const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
  new FileSync<DatabaseSchema>('./src/db/db.json'),
)

const app = createApp(new LowDbMemesRepository(db))

var port = process.env.PORT || '5000'
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
