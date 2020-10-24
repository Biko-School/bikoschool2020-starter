import request from 'supertest'
import { createApp } from '../app'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from '../DatabaseSchema'
import fixtureDb from './fixtures/db.json'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { MemeDatabase } from 'DatabaseSchema'
import { aMeme } from './builders/memeBuilder'

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
        expect(response.body.memes).toBeInstanceOf(Array)
        return done()
      })
  })
  it('responds should be an Array with the most recent 50 memes ', (done) => {
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
        expect(response.body.memes).toHaveLength(50)
        return done()
      })
  })
  it('response should be memes ordered by descendent date', (done) => {
    const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
      new Memory<DatabaseSchema>(''),
    )

    const mostRecent = '2020-08-20 02:24:24'
    const middleDate = '2020-08-20 02:24:22'
    const lessRecent = '2020-08-18 02:24:22'

    const memeA = aMeme('1').withDate(lessRecent).build()
    const memeB = aMeme('2').withDate(mostRecent).build()
    const memeC = aMeme('3').withDate(middleDate).build()

    db.defaults({ memes: [memeA, memeB, memeC] }).write()

    const app = createApp(db)
    request(app)
      .get('/api/memes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.memes[0].creationDate).toEqual(mostRecent)
        expect(response.body.memes[1].creationDate).toEqual(middleDate)
        expect(response.body.memes[2].creationDate).toEqual(lessRecent)
        return done()
      })
  })
  describe('Search memes', () => {
    it('Should show the results from user search', (done) => {
      const db: Lowdb.LowdbSync<DatabaseSchema> = Lowdb(
        new Memory<DatabaseSchema>(''),
      )

      const memeA = aMeme('1').withTags(['movie']).build()
      const memeB = aMeme('2').withTags(['another']).build()

      db.defaults({ memes: [memeA, memeB] }).write()

      const app = createApp(db)
      const term = 'movie'
      request(app)
        .get(`/api/memes/?search=${term}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.memes).toHaveLength(1)
          expect(response.body.memes[0].id).toBe('1')
          return done()
        })
    })
  })
})
