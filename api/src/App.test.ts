import { createApp, AppConfig } from './App'
import { HttpStatus } from './routes'
import request from 'supertest'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './core/infrastructure/model/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import dbData3 from './../fixtures/db3.json'
import dbData55 from './../fixtures/db55.json'
import { MemeDb } from './core/infrastructure/model/MemeDb'
import { MemeResponse } from './core/domain/MemeResponse'
import { aMemeDb } from './tests/builders/memeBuilder'
import { aDbSchema } from './tests/builders/DatabaseBuilder'
import { MemeLowDbRepository } from './core/infrastructure/MemeLowDbRepository'

describe('/api/memes', () => {
  test('devuelve una lista de 50 memes', (done) => {
    const app = createAppForTests(dbData55.memes)
    request(app)
      .get('/api/memes')
      .expect(HttpStatus.OK)
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
      .expect(HttpStatus.OK)
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
      .expect(HttpStatus.OK)
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
          width: 'HttpStatus.OK',
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
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes = res.body

        expect(memes[0]).toHaveProperty(
          'url',
          'https://media3.giphy.com/media/J6OQEgOUNOU5BWfjFj/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
        )
        expect(memes[0]).toHaveProperty('title', 'Dance Dancing GIF by MOODMAN')
        expect(memes[0]).toHaveProperty('id', 'J6OQEgOUNOU5BWfjFj')

        done()
      })
  })
})

describe('/api/memes?search', () => {
  test('devuelve los memes que tienen una etiqueta idéntica al termino de la busqueda', (done) => {
    const app = createAppForTests(dbData3.memes)

    request(app)
      .get('/api/memes?search=lol')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#lol'))
        done()
      })
  })

  test('devuelve los memes que contienen parcialmente el termino de la busqueda', (done) => {
    const aMemeDb1 = aMemeDb('1').withTags(['#brazil']).build()
    const aMemeDb2 = aMemeDb('2').withTags(['#lol']).build()

    const memes = [aMemeDb1, aMemeDb2]

    const app = createAppForTests(memes, { numRecentMemes: 3 })

    request(app)
      .get('/api/memes?search=bra')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#brazil'))
        done()
      })
  })

  test('ignora las mayusculas y minúsculas en la búsqueda', (done) => {
    const aDbMeme = aMemeDb('1').withTags(['#bRaZil']).build()
    const aDbMeme2 = aMemeDb('2').withTags(['#lol']).build()

    const app = createAppForTests([aDbMeme, aDbMeme2], { numRecentMemes: 3 })

    request(app)
      .get('/api/memes?search=brA')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#bRaZil'))
        done()
      })
  })

  test('ignora espacios laterales', (done) => {
    const aDbMeme = aMemeDb('1').withTags(['#brazil']).build()
    const aDbMeme2 = aMemeDb('2').withTags(['#lol']).build()

    const app = createAppForTests([aDbMeme, aDbMeme2], { numRecentMemes: 3 })

    request(app)
      .get('/api/memes?search=%20brazil%20')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#brazil'))
        done()
      })
  })

  test('ignora espacios entre palabras mayores que 1', (done) => {
    const aDbMeme = aMemeDb('1').withTags(['#dance moves']).build()
    const aDbMeme2 = aMemeDb('2').withTags(['#lol']).build()

    const app = createAppForTests([aDbMeme, aDbMeme2], { numRecentMemes: 3 })

    request(app)
      .get('/api/memes?search=dance%20%20%20%20moves')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#dance moves'))
        done()
      })
  })

  test('devuelve error si la longitud del término de búsqueda es menor de 3', (done) => {
    const aDbMeme = aMemeDb('1').withTags(['#dance']).build()
    const aDbMeme2 = aMemeDb('2').withTags(['#lol']).build()

    const app = createAppForTests([aDbMeme, aDbMeme2])
    request(app)
      .get('/api/memes?search=da')
      .expect(HttpStatus.BAD_REQUEST, done)
  })

  test('se pueden hacer dos búsquedas seguidas', (done) => {
    const aDbMeme = aMemeDb('1').withTags(['#dance']).build()
    const aDbMeme2 = aMemeDb('2').withTags(['#lol']).build()

    const app = createAppForTests([aDbMeme, aDbMeme2], { numRecentMemes: 3 })

    request(app)
      .get('/api/memes?search=dance')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#dance'))
      })

    request(app)
      .get('/api/memes?search=lol')
      .expect(HttpStatus.OK)
      .then((res) => {
        const memes: Array<any> = res.body
        expect(memes.length).toBe(1)
        memes.forEach((meme) => expect(meme.tags).toContain('#lol'))
        done()
      })
  })
})

const createAppForTests = (memes, appConfig: Partial<AppConfig> = null) => {
  const adapter = new Memory<DatabaseSchema>('')
  const db = Lowdb(adapter)
  db.defaults({ memes: memes }).write()
  MemeLowDbRepository.initialize(db)
  return createApp(MemeLowDbRepository, appConfig)
}
