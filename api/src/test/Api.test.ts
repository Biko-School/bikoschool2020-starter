import request from 'supertest'
import app from '../appModule'

describe('GET /api/memes', function () {
  it('responds with json', function (done) {
    request(app).get('/api/memes').expect(200, done)
  })
})
