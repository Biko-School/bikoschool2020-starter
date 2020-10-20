import { App } from './App'
import request from 'supertest'

describe('/api/memes', () => {
  test('existe el endpoint', (done) => {
    request(App).get('/api/memes').expect(200, done)
  })

  test('devuelve una lista', (done) => {
    request(App)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        done()
      })
  })
})
