import { createApp } from '../app'
import request from 'supertest'
import Memory from 'lowdb/adapters/Memory'
import { DatabaseSchema } from 'test/interfaces/DatabaseSchema'
import { ConfigSchema } from './interfaces/ConfigSchema'
import low from 'lowdb'
import { aMeme } from "./builders/memeBuilder"
import { aDatabase } from "./builders/dataBaseBuilder"
import { aConfig } from './builders/configBuilder'
import { builtinModules } from 'module'

describe('/api/memes', () => {
  it('devuelve los memes ordenados por fecha decreciente', function(done){
    const arrayMemes = [
      aMeme().withDate("2020-08-20 02:24:22").build(),
      aMeme().withDate("2020-08-26 22:51:59").build(),
      aMeme().withDate("2020-08-17 19:05:41").build(),
      aMeme().withDate("2020-09-20 02:24:22").build(),
      aMeme().withDate("2020-12-26 22:51:59").build(),
      aMeme().withDate("2020-01-17 19:05:41").build()
    ]
    const db = aDatabase().withMemes(arrayMemes).build()
    const appConfig = aConfig().withNumeroMemes(3).build()
    const app = implementApp(db,appConfig)
    request(app).get('/api/memes')
    .expect(200).then(response =>{
      expect(response.body[0]).toHaveProperty('import_datetime', '2020-12-26 22:51:59')
      expect(response.body[1]).toHaveProperty('import_datetime', '2020-09-20 02:24:22')
      expect(response.body[2]).toHaveProperty('import_datetime', '2020-08-26 22:51:59')
      done()
    })
  })

  it('devuelve los memes más recientes', function(done){
    const arrayMemes = [
      aMeme().withDate("2020-08-20 02:24:22").build(),
      aMeme().withDate("2020-08-26 22:51:59").build(),
      aMeme().withDate("2020-08-17 19:05:41").build(),
      aMeme().withDate("2020-09-20 02:24:22").build(),
      aMeme().withDate("2020-12-26 22:51:59").build(),
      aMeme().withDate("2020-01-17 19:05:41").build()
    ]
    const arrayMasRecientes = ['2020-12-26 22:51:59','2020-09-20 02:24:22','2020-08-26 22:51:59']
    const db = aDatabase().withMemes(arrayMemes).build()
    const appConfig = aConfig().withNumeroMemes(3).build()
    const app = implementApp(db,appConfig)
    request(app).get('/api/memes')
    .expect(200).then(response =>{
      response.body.forEach(meme => {
        expect(arrayMasRecientes).toContain(meme.import_datetime)
      });
      done()
    })
  })

  it('realizar una búsqueda con menos de tres caracteres', function(done){
    const arrayMemes = [
      aMeme().withDate("2020-08-20 02:24:22").build(),
      aMeme().withDate("2020-08-26 22:51:59").build(),
    ]
    const db = aDatabase().withMemes(arrayMemes).build()
    const appConfig = aConfig().withNumeroMemes(2).build()
    const app = implementApp(db,appConfig)
    const query: string = "ma"
    const errorMessage = { "message": "El texto de búsqueda necesita ser mayor que dos caracteres"}
    request(app).get('/api/memes/search?query='+query)
    .expect(401).then(response =>{
      expect(response.body).toEqual(errorMessage)
      done()
    })
  })

  it('realizar una búsqueda con la etiqueta rosario', function(done){
    const arrayMemes = [
      aMeme().withDate("").withTags('["#rosario"]').build(),
      aMeme().withDate("").withTags('["#central"]').build()
    ]
    const db = aDatabase().withMemes(arrayMemes).build()
    const appConfig = aConfig().withNumeroMemes(2).build()
    const app = implementApp(db,appConfig)
    const query: string = "rosario"
    request(app).get('/api/memes/search?query='+query)
    .expect(200).then(response =>{
      expect(response.body[0].tags).toStrictEqual('[#rosario]')
      done()
    })
  })
})

function implementApp(dataBase: DatabaseSchema,configs: ConfigSchema){
  const adapter = new Memory<DatabaseSchema>("")
  const db = low(adapter)
  db.defaults(dataBase).write()
  return createApp(db,configs)
}

