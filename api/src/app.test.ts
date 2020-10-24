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

  it('el endpoint devuelve una lista',function(done){
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

  it('El endpoint devuelve una lista de 3 memes ordenados por su fecha de creación', function(done){
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

    const haveTitle = jest.fn(element => element.title)
    request(app)
    .get('/api/memes')
    .expect(200).then(response => {
      haveTitle(response.body[0])
      haveTitle(response.body[1])
      haveTitle(response.body[2])
      expect(haveTitle).toHaveNthReturnedWith(1,"Dance Dancing GIF by MOODMAN")
      expect(haveTitle).toHaveNthReturnedWith(2,"Movie Brazil GIF by MOODMAN")
      expect(haveTitle).toHaveNthReturnedWith(3,"Funny Gif Lol GIF by MOODMAN")
      done()
    })
  })
})

