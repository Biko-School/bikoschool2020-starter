import { MemeSchema } from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import { aMeme } from './builders/MemeBuilder2'
import { mockDatabaseWithData } from './MockDatabase'

describe('Meme detail', function () {
  it('should respond the meme detail from the requested id ', function (done) {
    const memeSchema: MemeSchema = aMeme('1').withTags(['#Foo']).build()

    const db = mockDatabaseWithData({ memes: [memeSchema] })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/${encodeURIComponent('1')}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual('1')
        done()
      })
  })
})
