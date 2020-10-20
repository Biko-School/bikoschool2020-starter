import { app } from './app'
import request from 'supertest'

describe('/api/memes', () => {
  it('existe el endpoint', (done) => {
    request(app).get('/api/memes').expect(200, done)
  })

  it('devuelve un listado', (done) => {
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        done()
      })
  })

  it('devuleve un listado con 50 memes', (done) => {
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        done()
      })
  })
})
