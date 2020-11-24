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

  it('should respond with the related memes (memes containing tags of the orginal meme) of the meme of the requested id', function (done) {
    const aMemes: MemeSchema[] = [
      aMeme('1').withTags(['#foo', '#bar']).build(),
      aMeme('2').withTags(['#foo', '#bar']).build(),
      aMeme('3').withTags(['#foo', '#irrelevant tag']).build(),
      aMeme('4').withTags(['#irrelevant tag']).build(),
      aMeme('5').withTags(['#irrelevant tag', '#bar']).build(),
    ]

    const db = mockDatabaseWithData({ memes: aMemes })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/${encodeURIComponent('1')}/related`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(3)

        expect(response.body[0].id).toEqual('2')
        expect(response.body[1].id).toEqual('3')
        expect(response.body[2].id).toEqual('5')

        done()
      })
  })

  it('should respond with the an empty array if the requested meme does not have related memes', function (done) {
    const aMemes: MemeSchema[] = [
      aMeme('1').withTags(['#foo', '#bar']).build(),
      aMeme('2').withTags(['#other']).build(),
    ]

    const db = mockDatabaseWithData({ memes: aMemes })
    const app = createApp(db)

    request(app)
      .get(`/api/memes/${encodeURIComponent('2')}/related`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(0)
        done()
      })
  })
})
