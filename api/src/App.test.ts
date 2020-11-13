import { createApp, AppConfig } from './App'
import request from 'supertest'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './schemas/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import dbData3 from './../fixtures/db3.json'
import dbData55 from './../fixtures/db55.json'
import { MemeDb } from 'schemas/MemeDb'
import { MemeResponse } from 'schemas/MemeResponse'
import { aMemeDb } from './tests/builders/memeBuilder'
import { aDbSchema } from './tests/builders/DatabaseBuilder'

describe('/api/memes', () => {
  test('devuelve una lista de 50 memes', (done) => {
    const app = createAppForTests(dbData55.memes)
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(50)
        done()
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
          expect(new Date(memes[i].date).getTime()).toBeLessThanOrEqual(
            new Date(memes[i - 1].date).getTime(),
          )
        }
        done()
      })
  })

  test('devuelve los más recientes', (done) => {
    const aMemeDb1 = aMemeDb('1').withDate('2020-08-26 23:51:59').build()
    const aMemeDb2 = aMemeDb('2').withDate('2020-07-26 21:51:59').build()
    const aMemeDb3 = aMemeDb('3').withDate('2019-08-22 20:51:59').build()
    const aMemeDb4 = aMemeDb('4').withDate('2020-08-20 22:51:59').build()
    const aMemeDb5 = aMemeDb('5').withDate('2020-08-25 16:51:59').build()

    const memes = [aMemeDb1, aMemeDb2, aMemeDb3, aMemeDb4, aMemeDb5]
    const expectedIds = ['1', '4', '5']

    const app = createAppForTests(memes, { numRecentMemes: 3 })

    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes).toHaveLength(3)
        memes.forEach((meme) => expect(expectedIds).toContain(meme.id))
        done()
      })
  })

  test('los memes tienen los atributos esperados por front', (done) => {
    const sampleMeme: MemeDb = {
      id: 'J6OQEgOUNOU5BWfjFj',
      title: 'Dance Dancing GIF by MOODMAN',
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
})

describe('/api/memes?search', () => {
  test('devuelve los que coinciden con la busqueda', (done) => {
    // const aMemeDbQueNoCoincide = aMemeDb('1').withTags(['bar']).build()
    // const aMemeDbQueCoincide = aMemeDb('2').withTags(['lol']).build()

    // const memes = [aMemeDbQueNoCoincide, aMemeDbQueCoincide]
    // const expectedIds = ['1', '3', '5']

    const app = createAppForTests(dbData3.memes)

    request(app)
      .get('/api/memes?search=lol')
      .expect(200)
      .then((res) => {
        const memes: Array<any> = res.body
        memes.forEach((meme) => expect(meme.tags).toContain('#lol'))
        done()
      })
  })
})

const createAppForTests = (memes, appConfig: Partial<AppConfig> = null) => {
  const adapter = new Memory<DatabaseSchema>('')
  const db = Lowdb(adapter)
  db.defaults({ memes: memes }).write()
  return createApp(db, appConfig)
}
