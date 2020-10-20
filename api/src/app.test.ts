import request from 'supertest'
import { app } from './app'

describe('/api/memes', () => {
  it('responds should be an Array', (done) => {
    request(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        return done()
      })
  })
  it('responds should be an Array with 50 memes', (done) => {
    request(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        return done()
      })
  })
})
