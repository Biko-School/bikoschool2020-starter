import { createApp } from './App'
import request from 'supertest'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './schemas/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import dbData3 from './../fixtures/db3.json'
import dbData55 from './../fixtures/db55.json'

describe('/api/memes', () => {
  test('existe el endpoint', (done) => {
    const app = createAppForTests([])
    request(app).get('/api/memes').expect(200, done)
  })

  test('devuelve una lista', (done) => {
    const app = createAppForTests([])
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        done()
      })
  })

  test('devuelve una lista de 50 memes', (done) => {
    const app = createAppForTests(dbData55.memes)
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(50)
        done()
      })
  })
})

test('devuelve una lista ordenada de memes', (done) => {
  const app = createAppForTests(dbData3.memes)
  request(app)
    .get('/api/memes')
    .expect(200)
    .then((res) => {
      const memes = res.body
      for (let length = memes.length, i = 1; i < length; ++i) {
        expect(new Date(memes[i].date).getTime()).toBeGreaterThan(
          new Date(memes[i - 1].date).getTime(),
        )
      }
      done()
    })
})

test('los memes tienen los atributos esperados por front', (done) => {
  const sampleMeme = {
    id: 'J6OQEgOUNOU5BWfjFj',
    type: 'gif',
    slug: 'moodman-J6OQEgOUNOU5BWfjFj',
    giphyUrl: 'https://giphy.com/gifs/moodman-J6OQEgOUNOU5BWfjFj',
    title: 'Dance Dancing GIF by MOODMAN',
    source_tld: '',
    source_post_url: '',
    import_datetime: '2020-08-26 22:51:59',
    username: '',
    images: {
      original: {
        width: '480',
        height: '402',
        url:
          'https://media3.giphy.com/media/J6OQEgOUNOU5BWfjFj/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif',
      },
      small: {
        width: '200',
        height: '168',
        url:
          'https://media3.giphy.com/media/J6OQEgOUNOU5BWfjFj/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      },
    },
    tags: ['#dance moves', '#dance', '#dancing', '#dancin'],
  }

  const app = createAppForTests([sampleMeme])
  request(app)
    .get('/api/memes')
    .expect(200)
    .then((res) => {
      const memes = res.body

      expect(memes[0]).toHaveProperty(
        'url',
        'https://media3.giphy.com/media/J6OQEgOUNOU5BWfjFj/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif',
      )
      expect(memes[0]).toHaveProperty('title', 'Dance Dancing GIF by MOODMAN')
      expect(memes[0]).toHaveProperty('id', 'J6OQEgOUNOU5BWfjFj')

      done()
    })
})

const createAppForTests = (memes) => {
  const adapter = new Memory<DatabaseSchema>('')
  const db = Lowdb(adapter)
  db.defaults({ memes: memes }).write()
  return createApp(db)
}
