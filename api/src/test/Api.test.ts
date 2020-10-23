import request from 'supertest'
import { app } from '../app'

const rutaMemes = '/memes'
const HTTP_OK = 200

describe('GET /api/memes', function () {
  it('responds with 200', function (done) {
    request(app).get('/api/memes').expect(HTTP_OK, done)
  })

  it('responds with array', function (done) {
    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        done()
      })
  })

  it('responds with a list of 50 memes', function (done) {
    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        done()
      })
  })
})
