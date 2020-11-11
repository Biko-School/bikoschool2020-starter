import { MemeSchema } from 'DatabaseSchema'
import request from 'supertest'
import { createApp } from '../app'
import {aMeme} from './builders/MemeBuilder2'
import { mockDatabaseWithData } from './MockDatabase'


describe('R1. GET /api/memes/search minimum lenght of the filter', function () {
  it('the filter should have a minimum length of 3 characters to return results, ignoring side spaces (R4)', function (done) {
  const aMemes : MemeSchema[] = [
      aMeme("1").withTags(["#Foo"]).build(),
  ]

  const db = mockDatabaseWithData({ memes: aMemes })
  const app = createApp(db)

  request(app)
    .get(`/api/memes/search?filter=${encodeURIComponent(' Fo ')}`)
    .expect(403)
    .then((response) => {
      expect(response.body).toEqual(
        'La longitud mínima de búsqueda debe de ser 3 carácteres',
      )
      done()
    })
  })

  it('the filter should have a minimum length of 3 characters to return results, ignoring interior spaces greater than 1 (R4)', function (done) {
    const aMemes : MemeSchema[] = [
        aMeme("1").withTags(["F o"]).build(),
    ]
  
    const db = mockDatabaseWithData({ memes: aMemes })
    const app = createApp(db)
  
    request(app)
      .get(`/api/memes/search?filter=${encodeURIComponent('F  o')}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(1)
        done()
      })
    })
})

describe('R2. GET /api/memes/search same tag', function () {
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

describe('R3. GET /api/memes/search partial tag', function () {
   it('should return the meme which contains a tag that partially matches the filter', function (done) {
      const aMemes : MemeSchema[] = [
          aMeme("1").withTags(["#Foo"]).build(),
          aMeme("2").withTags(["#Bar", "#Foo is the new #Bar"]).build(),
      ]
  
      const db = mockDatabaseWithData({ memes: aMemes })
      const app = createApp(db)
  
      request(app)
        .get(`/api/memes/search?filter=${encodeURIComponent('is the new #Bar')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1)
          expect(response.body[0].id).toEqual("2")
          done()
        })
   })
})

describe('R4. GET /api/memes/search skip spaces', function () {
  it('should ignore side spaces, and interior spaces greater than 1 of the filter', function (done) {
      const aMemes : MemeSchema[] = [
          aMeme("1").withTags(["#Foo is the new #Bar"]).build(),
          aMeme("2").withTags(["#Bar"]).build(),
      ]
  
      const db = mockDatabaseWithData({ memes: aMemes })
      const app = createApp(db)
  
      request(app)
        .get(`/api/memes/search?filter=${encodeURIComponent('  is   the new    #Bar     ')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1)
          expect(response.body[0].id).toEqual("1")
          done()
        })
   })
})

describe('R5. GET /api/memes/search ignore case', function () {
  it('should ignore upper and lower case of the filter', function (done) {
      const aMemes : MemeSchema[] = [
          aMeme("1").withTags(["#Foo"]).build(),
          aMeme("2").withTags(["#Bar"]).build(),
      ]
  
      const db = mockDatabaseWithData({ memes: aMemes })
      const app = createApp(db)
  
      request(app)
        .get(`/api/memes/search?filter=${encodeURIComponent('#bAr')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1)
          expect(response.body[0].id).toEqual("2")
          done()
        })
   })
})

describe('R8A. GET /api/memes/search search results ordered by date', function () {
  it('The memes should be ordered from most recent to least', function (done) {
      const aMemes : MemeSchema[] = [
          aMeme("1").withDate("2020-08-23 02:24:22").withTags(["#Foo", "#Bar"]).build(),
          aMeme("2").withDate("2020-08-20 01:10:10").withTags(["#Bar"]).build(),
          aMeme("3").withDate("2020-08-25 03:24:22").withTags(["#Bar", "#Baz"]).build(),
      ]
  
      const db = mockDatabaseWithData({ memes: aMemes })
      const app = createApp(db)
  
      request(app)
        .get(`/api/memes/search?filter=${encodeURIComponent('#bAr')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(3)
          expect(response.body[0].id).toEqual("3")
          expect(response.body[1].id).toEqual("1")
          expect(response.body[2].id).toEqual("2")
          done()
        })
   })
})