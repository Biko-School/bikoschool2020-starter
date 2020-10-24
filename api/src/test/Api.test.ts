import { DatabaseSchema, Meme } from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import MemorySync from 'lowdb/adapters/Memory'
import FileSync from 'lowdb/adapters/FileSync'
import Lowdb from 'lowdb'
import dbData from '../fixtures/db.json'
import aMeme from './builders/MemeBuilder'

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

  it('responds with memes ordered by date', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<Meme> = {
      title: 'Movie Brazil GIF by MOODMAN',
      date: new Date('2020-08-22 02:24:22'),
    }
    const meme2: Partial<Meme> = {
      title: 'Miguelon',
      date: new Date('2020-08-11 02:24:22'),
    }
    const meme3: Partial<Meme> = {
      title: 'Don Xabier',
      date: new Date('2020-08-23 02:24:22'),
    }
    const aMemes = [aMeme(meme1), aMeme(meme2), aMeme(meme3)]
    db.defaults({ memes: aMemes }).write()

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(new Date(response.body[0].date)).toStrictEqual(aMemes[2].date)
        expect(new Date(response.body[1].date)).toStrictEqual(aMemes[0].date)
        expect(new Date(response.body[2].date)).toStrictEqual(aMemes[1].date)
        done()
      })
  })
})
