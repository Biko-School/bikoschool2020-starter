import { MemeSchema } from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import { aMeme } from './builders/MemeBuilder2'
import { mockDatabaseWithData } from './MockDatabase'

describe('Meme detail', function () {
  it('should respond the meme detail from the requested id', function (done) {
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

  it('should respond the meme detail with user info from the requested id', function (done) {
    const user = {
      avatar_url:
        'https://media3.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg',
      display_name: 'GIPHY Studios Originals',
      banner_image: 'irrelevant',
      banner_url: 'irrelevant',
      profile_url: 'irrelevant',
      username: 'irrelevant',
      is_verified: 'irrelevant',
    }
    const memeSchema: MemeSchema = aMeme('1').withUser(user).build()

    const db = mockDatabaseWithData({ memes: [memeSchema] })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/${encodeURIComponent('1')}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          id: memeSchema.id,
          user: {
            name: memeSchema.user.display_name,
            avatar_url: memeSchema.user.avatar_url,
          },
        })
        done()
      })
  })

  it('should respond null if the requested id does not exit', function (done) {
    const memeSchema: MemeSchema = aMeme('1').build()

    const db = mockDatabaseWithData({ memes: [memeSchema] })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/${encodeURIComponent('notExistingId')}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(null)
        done()
      })
  })
})
