import { createApp } from './App'
import request from 'supertest'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'

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
    const app = createAppForTests(new Array(50))
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(50)
        done()
      })
  })
})

const createAppForTests = (memes) => {
  const adapter = new Memory<DatabaseSchema>('')
  const db = Lowdb(adapter)
  db.defaults({ memes: memes }).write()
  return createApp(db)
}
