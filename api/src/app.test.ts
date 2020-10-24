import { createApp } from './app'
import request from 'supertest'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from 'DatabaseSchema'
import low from 'lowdb'
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

  it('devuelve una lista',function(done){
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

  it('devuelve una lista de 50 memes', function(done){
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

  it('devuelve una lista de memes ordenados por su fecha de creación en orden descendente', function(done){
    const adapter = new Memory<DatabaseSchema>("")
    const db = low(adapter)
    db.defaults({
      memes : [
        {
          "title": "Funny Gif Lol GIF by MOODMAN",
          "import_datetime": "2020-08-17 19:05:41"
        },
        {
          "title": "Dance Dancing GIF by MOODMAN",
          "import_datetime": "2020-08-26 22:51:59"
        },
        {
          "title": "Movie Brazil GIF by MOODMAN",
          "import_datetime": "2020-08-20 02:24:22"
        } 
      ]
    }).write()
    const app = createApp(db)

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

