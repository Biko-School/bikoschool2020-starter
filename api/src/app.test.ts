import request from 'supertest'
import { createApp } from './app'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from './DatabaseSchema'
import fixtureDb from './fixtures/db.json'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

describe('/api/memes', () => {
  it('responds should be an Array', (done) => {
    const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
      new Memory<DatabaseSchema>(''),
    )
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

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
    const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
      new Memory<DatabaseSchema>(''),
    )
    db.defaults(fixtureDb).write()

    const app = createApp(db)
    request(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        return done()
      })
  })
  it('response should be an Array with 50 memes order by date', (done) => {
    const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
      new Memory<DatabaseSchema>(''),
    )
    const memesUnordered = [
      {
        import_datetime: '2020-08-18 02:24:22',
      },
      {
        import_datetime: '2020-08-19 02:24:22',
      },
    ]
    const memesOrdered = [
      {
        import_datetime: '2020-08-19 02:24:22',
      },
      {
        import_datetime: '2020-08-18 02:24:22',
      },
    ]

    db.defaults({ memes: memesUnordered }).write()

    const app = createApp(db)
    request(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(memesOrdered)
        return done()
      })
  })
})
