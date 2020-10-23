import DatabaseSchema from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import MemorySync from 'lowdb/adapters/Memory'
import FileSync from 'lowdb/adapters/FileSync'
import Lowdb from 'lowdb'
import dbData from '../fixtures/db.json'


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

    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults(dbData).write()
    
    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        done()
      })
  })

  interface Meme {
    title: string,
    import_datetime: Date
  }

  function aMeme(title: string, date?: Date) : Meme {
    return { title, import_datetime: date || new Date()}
  }

  it('responds with memes ordered by date', function (done) {

    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const aMemes = [
      aMeme("Movie Brazil GIF by MOODMAN", new Date("2020-08-22 02:24:22")),
      aMeme("Miguelon", new Date("2020-08-11 02:24:22")),
      aMeme("Don Xabier", new Date("2020-08-23 02:24:22"))
    ]
    db.defaults({memes : aMemes}).write()
 
    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(new Date(response.body[0].import_datetime)).toStrictEqual(aMemes[2].import_datetime)
        expect(new Date(response.body[1].import_datetime)).toStrictEqual(aMemes[0].import_datetime)
        expect(new Date(response.body[2].import_datetime)).toStrictEqual(aMemes[1].import_datetime)
        done()
      })
  })
})
