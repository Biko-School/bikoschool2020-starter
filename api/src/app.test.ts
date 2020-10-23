import { createApp } from './app'
import request from 'supertest'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from 'DatabaseSchema'
import low from 'lowdb'
import { response } from 'express'
import dbTest from "./fixtures/db.json"
describe('/api/memes', () => {
  it('existe el endpoint', function(done){
    const adapter = new Memory<DatabaseSchema>('')
    const db =  low(adapter)
    db.defaults({memes: []}).write()
    const app = createApp(db)
    request(app)
    .get('/api/memes')
    .expect(200,done)
  })

  it('el endpoint devuelve una lista', (done)=>{
    const adapter = new Memory<DatabaseSchema>("")
    const db = low(adapter)
    db.defaults({memes: []}).write()
    const app = createApp(db)
    request(app)
    .get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body).toBeInstanceOf(Array)
      done()
    })
  })

  it('el endpoint devuelve una lista de 50 memes', function(done){
    const adapter = new Memory<DatabaseSchema>("")
    const db = low(adapter)
    db.defaults(dbTest).write()
    const app = createApp(db)
    request(app)
    .get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body).toHaveLength(50)
      done()
    })
  })
})

