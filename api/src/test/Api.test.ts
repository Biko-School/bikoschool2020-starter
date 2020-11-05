import { DatabaseSchema, MemeDB } from 'DatabaseSchema'
import { Meme } from '../Meme'
import request from 'supertest'
import { createApp } from '../app'
import MemorySync from 'lowdb/adapters/Memory'
import Lowdb from 'lowdb'
import dbData from '../fixtures/db.json'
import aMeme from './builders/MemeBuilder'
import FileSync from 'lowdb/adapters/FileSync'

const HTTP_OK = 200
const HTTP_FORBIDEN = 403

describe('GET /api/memes', function () {
  it('responds with 200', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    db.defaults({ memes: [] }).write()

    const app = createApp(db)

    request(app).get('/api/memes').expect(HTTP_OK, done)
  })

  it('responds with array', function (done) {
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

  it('responds with a list of 50 memes', function (done) {
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

  it('responds with memes ordered by date', function (done) {
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

  it('the response should be Meme Interface', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Don Xabier',
      import_datetime: '2020-08-23 02:24:22',
    }
    const aMemes = [aMeme(meme1)]
    db.defaults({ memes: aMemes }).write()

    const responseExpected : Meme = {
      id: '1',
      title: 'Don Xabier',
      image: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      date: '2020-08-23 02:24:22',
      tags: ['#movie', '#brazil', '#brazil the movie'],
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

describe('GET /api/search', function () {
  it('should be at least 3 characteres finding by tag', function (done) {
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
      .get('/api/memes/nb')
      .expect(HTTP_FORBIDEN)
      .then((response) => {
        expect(response.body).toEqual(
          'La longitud mínima de búsqueda debe de ser 3 carácteres',
        )
        done()
      })
  })

  it('should return a meme with the same tag', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Dance Dancing GIF by MOODMAN',
      import_datetime: '2020-08-26 22:51:59',
      tags: ['nba'],
    }
    const aMemes = [aMeme(meme1)]

    db.defaults({ memes: aMemes }).write()

    const responseExpected : Meme = {
      id: '1',
      title: 'Dance Dancing GIF by MOODMAN',
      image: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      date: '2020-08-26 22:51:59',
      tags: ['nba'],
    }

    const app = createApp(db)

    request(app)
      .get('/api/memes/nba')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body[0]).toEqual(
          responseExpected
        )
        done()
      })
  })

  it('should no return a meme if there are not memes with the same tag', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    const meme1: Partial<MemeDB> = {
      title: 'Sunglasses Horse GIF by MOODMAN',
      import_datetime: '2020-08-26 22:20:43',
      tags: ['nba'],
    }
    const aMemes = [aMeme(meme1)]
  
    db.defaults({ memes: aMemes }).write()
  
    const app = createApp(db)
  
    request(app)
      .get('/api/memes/nbc')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body).toHaveLength(0)
        done()
      })
  })

  it('should return the memes that have the same tag', function (done) {
    const adapter = new MemorySync<DatabaseSchema>('')
    const db = Lowdb(adapter)
    
    const meme1: Partial<MemeDB> = {
      title: 'Dance Dancing GIF by MOODMAN',
      import_datetime: '2020-08-26 22:51:59',
      tags: ['abc', 'nba'],
    }
    const meme2: Partial<MemeDB> = {
      title: 'Sunglasses Horse GIF by MOODMAN',
      import_datetime: '2020-08-26 22:20:43',
      tags: ['aaa', 'bbb'],
    }
    const meme3: Partial<MemeDB> = {
      title: 'Confused Thinking GIF by MOODMAN',
      tags: ['nba', 'ccc'],
    }
    const aMemes = [aMeme(meme1), aMeme(meme2), aMeme(meme3)]

    db.defaults({ memes: aMemes }).write()

    const responseExpected : Meme[] = [{
      id: '1',
      title: 'Dance Dancing GIF by MOODMAN',
      image: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      date: '2020-08-26 22:51:59',
      tags: ['abc', 'nba'],
    },
    {
      id: '1',
      title: 'Confused Thinking GIF by MOODMAN',
      image: {
        width: '200',
        height: '100',
        url: 'http://google.com',
      },
      date: '2020-08-22T00:24:22.000Z',
      tags: ['nba', 'ccc'],
    }]

    const app = createApp(db)

    request(app)
      .get('/api/memes/nba')
      .expect(HTTP_OK)
      .then((response) => {
        expect(response.body[0]).toEqual(
          responseExpected[0]
        )
        expect(response.body[1]).toEqual(
          responseExpected[1]
        )
        done()
      })
  })

  it('should return memes with the same tag (containing #)', function (done) {
    const adapter = new FileSync<DatabaseSchema>('./db/db.json')
    const db = Lowdb(adapter)
    const app = createApp(db)

    request(app)
    .get(`/api/memes/${encodeURIComponent("#hmm")}`)
    .expect(HTTP_OK)
    .then((response) => {
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(1)
      expect(response.body[0]).toHaveProperty("tags")
      //expect(response.body[0]).toHaveProperty(['tags', 2], '#hmm')
      expect(response.body[0].tags).toEqual(expect.arrayContaining(["#hmm"]));
      done()
    })
  })

})
