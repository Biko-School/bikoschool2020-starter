import { createApp } from '../app'
import request from 'supertest'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from 'test/DatabaseSchema'
import low from 'lowdb'
import dbTest from "../fixtures/db.json"
import tresMemes from "../fixtures/3memes.json"

describe('/api/memes', () => {
  it('devuelve una lista de 50 memes', function(done){
    const app = implementApp(dbTest)
    request(app)
    .get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body).toHaveLength(50)
      done()
    })
  })

  it('devuelve una lista de 50 memes ordenados por su fecha de creación en orden descendente', function(done){
    const app = implementApp(tresMemes)
    request(app)
    .get('/api/memes')
    .expect(200).then(response => {
      expect(response.body[0]).toHaveProperty('import_datetime',"2020-08-26 22:51:59")
      expect(response.body[1]).toHaveProperty('import_datetime',"2020-08-20 02:24:22")
      expect(response.body[2]).toHaveProperty('import_datetime',"2020-08-17 19:05:41")
      done()
    })
  })
})

function implementApp(dataBase){
  const adapter = new Memory<DatabaseSchema>("")
    const db = low(adapter)
    db.defaults(dataBase).write()
    return createApp(db)
}

