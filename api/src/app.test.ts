import app from './app'
import request from 'supertest'
import { response } from 'express'

describe('/api/memes', () => {
  it('existe el endpoint', function(done){
    request(app)
    .get('/api/memes')
    .expect(200,done)
  })

  it('el endpoint devuelve una lista', function(done){
    request(app)
    .get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body).toBeInstanceOf(Array)
      done()
    })
  })

  it('el endpoint devuelve una lista', function(done){
    request(app)
    .get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body).toHaveLength(50)
      done()
    })
  })

})

