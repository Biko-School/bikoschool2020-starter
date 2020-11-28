import { DatabaseSchema, MemeDB } from 'DatabaseSchema'
import { Meme } from '../core/domain/meme/Meme'
import request from 'supertest'
import { createApp } from '../app'
import MemorySync from 'lowdb/adapters/Memory'
import Lowdb from 'lowdb'
import dbData from '../fixtures/db.json'
import aMeme from './builders/MemeBuilder'

const HTTP_OK = 200
const HTTP_FORBIDEN = 403

describe('GET /api/memes', async function () {
  it('responds with 200', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

    request(app).get('/api/memes').expect(HTTP_OK, done)
  })

  it('responds with array', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
        done()
      })
  })

  it('responds with a list of 50 memes', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults(dbData).write()

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toHaveLength(50)
        done()
      })
  })

  it('responds with memes ordered by date', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Movie Brazil GIF by MOODMAN',
      import_datetime: '2020-08-22 02:24:22',
    }
    const meme2: Partial<MemeDB> = {
      title: 'Miguelon',
      import_datetime: '2020-08-11 02:24:22',
    }
    const meme3: Partial<MemeDB> = {
      title: 'Don Xabier',
      import_datetime: '2020-08-23 02:24:22',
    }
    const aMemes = [aMeme(meme1), aMeme(meme2), aMeme(meme3)]
    db.defaults({ memes: aMemes }).write()

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body[0].date).toStrictEqual('2020-08-23 02:24:22')
        expect(response.body[1].date).toStrictEqual('2020-08-22 02:24:22')
        expect(response.body[2].date).toStrictEqual('2020-08-11 02:24:22')
        done()
      })
  })

  it('the response should be Meme Interface', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Don Xabier',
      import_datetime: '2020-08-23 02:24:22',
    }
    const aMemes = [aMeme(meme1)]
    db.defaults({ memes: aMemes }).write()

    const responseExpected = {
      id: '1',
      title: 'Don Xabier',
      image: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      date: '2020-08-23 02:24:22',
      tags: ['#movie', '#brazil', '#brazil the movie'],
      user: {
        avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
        banner_image: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        profile_url: 'https://giphy.com/msnbc/',
        username: 'msnbc',
        display_name: 'MSNBC',
        is_verified: true,
      },
    }

    const app = createApp(db)

    request(app)
      .get('/api/memes')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body[0]).toEqual(responseExpected)
        done()
      })
  })
})
describe('GET memes', function () {
  it('should be at least 3 characteres finding by tag', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Don Miguel',
      import_datetime: '2020-08-23 02:24:22',
      tags: ['nba'],
    }
    const aMemes = [aMeme(meme1)]
    db.defaults({ memes: aMemes }).write()

    const app = createApp(db)
    const errorMessage = {
      message: 'La longitud mínima de búsqueda debe de ser 3 carácteres',
    }
    request(app)
      .get('/api/memes/nb')
      .expect(HTTP_FORBIDEN)
      .then((response) => {
        expect(response.body).toEqual(errorMessage)
        done()
      })
  })
  it('Trae un meme con el tag nba', async function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Don Miguel',
      import_datetime: '2020-08-23 02:24:22',
      tags: ['nba'],
    }
    const aMemes = [aMeme(meme1)]
    db.defaults({ memes: aMemes }).write()

    const app = createApp(db)
    request(app)
      .get('/api/memes/nba')
      .expect(HTTP_OK)
      .then((response) => {
        console.log(response.body)
        //expect(response.body).toEqual(errorMessage)
        done()
      })
  })
})
