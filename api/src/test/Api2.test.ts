import { MemeSchema } from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import {aMeme} from './builders/MemeBuilder2'
import { mockDatabaseWithData } from './MockDatabase'

describe('GET /api/memes/search', function () {
    it('should return the meme which contains the same tag', function (done) {

    const aMemes : MemeSchema[] = [
        aMeme("1").withTags(["#Foo"]).build(),
        aMeme("2").withTags(["#Bar"]).build(),
    ]

    const db = mockDatabaseWithData({ memes: aMemes })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/search?filter=${encodeURIComponent('#Foo')}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(1)
        expect(response.body[0].id).toEqual("1")
        done()
      })
    })
})