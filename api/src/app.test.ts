import supertest from 'supertest'
import { app } from './app'

describe('/api/memes', () => {
  it('responds with json', (done) => {
    supertest(app).get('/api/memes').expect(200, done)
  })
  it('responds should be an Array', (done) => {
    supertest(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        return done()
      })
  })
})
