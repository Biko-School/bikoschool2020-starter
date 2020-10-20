import request from 'supertest'
import app from '../app'

describe('GET /api/memes', function () {
  it('responds with 200', function (done) {
    request(app).get('/api/memes').expect(200, done)
  })
})
