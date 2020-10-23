import DatabaseSchema from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import MemorySync from 'lowdb/adapters/Memory'
import FileSync from 'lowdb/adapters/FileSync'
import Lowdb from 'lowdb'


const HTTP_OK = 200

describe('GET /api/memes', function () {
  
  it('responds with 200', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

    request(app).get('/api/memes').expect(HTTP_OK, done)
  })

  it('responds with array', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        done()
      })
  })

  it('responds with a list of 50 memes', function (done) {

    const adapter = new FileSync<DatabaseSchema>('./src/fixtures/db.json')
    const db = Lowdb(adapter)
    
    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        done()
      })
  })
})
