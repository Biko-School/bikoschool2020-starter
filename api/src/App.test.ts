import { createApp } from './App'
import request from 'supertest'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import dbData3 from '../fixtures/db3.json'
import dbData55 from '../fixtures/db55.json'

describe('/api/memes', () => {
  test('existe el endpoint', (done) => {
    const app = createAppForTests([])
    request(app).get('/api/memes').expect(200, done)
  })

  test('devuelve una lista', (done) => {
    const app = createAppForTests([])
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        done()
      })
  })

  test('devuelve una lista de 50 memes', (done) => {
    const app = createAppForTests(dbData55.memes)
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(50)
        done()
      })
  })
})

test('devuelve una lista ordenada de memes', (done) => {
  const app = createAppForTests(dbData3.memes)
  request(app)
    .get('/api/memes')
    .expect(200)
    .then((res) => {
      const memes = res.body
      for (let length = memes.length, i = 1; i < length; ++i) {
        expect(new Date(memes[i].import_datetime).getTime()).toBeGreaterThan(
          new Date(memes[i - 1].import_datetime).getTime(),
        )
      }
      done()
    })
})

const createAppForTests = (memes) => {
  const adapter = new Memory<DatabaseSchema>('')
  const db = Lowdb(adapter)
  db.defaults({ memes: memes }).write()
  return createApp(db)
}
