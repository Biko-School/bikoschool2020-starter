import app from './app'
import request from 'supertest'
import express from 'express'
import { assert } from 'console'

describe('GET memes', () => {

    it('existe el endpoint', (done) => {
        request(app)
            .get('/api/memes')
            .expect(200, done)
    })

    it('manda array', (done) => {
        request(app)
            .get('/api/memes')
            //.expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                //expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body).toBeInstanceOf(Array)
                done()
            })
            
    })

    it('devuelve 50 memes', (done) => {
        request(app)
            .get('/api/memes')
            //.expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                //expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body).toHaveLength(50)
                done()
            })
            
    })

})