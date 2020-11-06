import { createApp } from './app'
import request from 'supertest'
import express from 'express'
import { assert } from 'console'
import { DatabaseSchema } from 'model/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import low from 'lowdb'
import memes from '../db/db.json'
import { aMeme } from './model/meme'

describe('GET memes', () => {

    it('Devuelve 50 memes', (done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)
        db.defaults(memes).write()
        request(createApp(db,50))
            .get('/api/memes')
            //.expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                //expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body).toHaveLength(50)
                done()
            })
    })


    it('Devuelve los memes más recientes',(done) =>{
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ import_datetime: "2020-08-22 02:24:22" }),
            aMeme({ import_datetime: "2020-08-19 02:24:22" }),
            aMeme({ import_datetime: "2020-08-21 02:24:22" }),
            aMeme({ import_datetime: "2020-08-18 06:24:22" }),
            aMeme({ import_datetime: "2020-08-20 02:24:22" }),
        ]

        const listadoOrdenadoTresMemes = [
            aMeme({ import_datetime: "2020-08-22 02:24:22" }),
            aMeme({ import_datetime: "2020-08-21 02:24:22" }),
            aMeme({ import_datetime: "2020-08-20 02:24:22" }),
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,3))
            .get('/api/memes')
            .expect(200)
            .then((response) => {
                response.body.forEach(element => {
                    expect(listadoOrdenadoTresMemes).toContainEqual(element)
                });
                done()
            })
    })

    it('busca un meme con la etiqueta exacta de la busqueda',(done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags:['homer'] }),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags: ['simpsons','homer']})
        ]

        const foundMemes = [
            aMeme({ tags: ['homer'] }),
            aMeme({ tags: ['simpsons','homer']})
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,4))
            .get('/api/memes?query=homer')
            .expect(200)
            .then((response) => {
                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                })
                done()
            })
    })

    it('busca un meme con la etiqueta parcial de la busqueda',(done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags:['homer'] }),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags: ['simpsons','homer']})
        ]

        const foundMemes = [
            aMeme({ tags: ['homer'] }),
            aMeme({ tags: ['simpsons','homer']})
        ]
        const notFoundMemes = [
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,4))
            .get('/api/memes?query=hom')
            .expect(200)
            .then((response) => {
                console.log(response.body)

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('ignora los espacios de la izda de la busqueda',(done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags:['homer'] }),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags: ['simpsons','homer']})
        ]

        const foundMemes = [
            aMeme({ tags: ['homer'] }),
            aMeme({ tags: ['simpsons','homer']})
        ]
        const notFoundMemes = [
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,4))
            .get('/api/memes?query=   hom')
            .expect(200)
            .then((response) => {
                console.log(response.body)

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })


    // it('Devuelve memes ordenados de más recientes a más antiguos', (done) => {
    //     const adapter = new Memory<DatabaseSchema>('')
    //     const db = low(adapter)

    //     const orderedMemes = [
    //         aMeme({ import_datetime: "2020-08-22 02:24:22" }),
    //         aMeme({ import_datetime: "2020-08-21 02:24:22" }),
    //         aMeme({ import_datetime: "2020-08-20 02:24:22" }),
    //     ]

    //     const desorderedMemes = [
    //         aMeme({ import_datetime: "2020-08-22 02:24:22" }),
    //         aMeme({ import_datetime: "2020-08-20 02:24:22" }),
    //         aMeme({ import_datetime: "2020-08-21 02:24:22" }),
    //     ]

    //     const myMemes = {
    //         memes: desorderedMemes
    //     }

    //     db.defaults(myMemes).write()

    //     request(createApp(db,3))
    //         .get('/api/memes')
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body).toEqual(orderedMemes)
    //             done()
    //         })
    // })

    // it('Busca memes con el texto enviado', (done) => {
    //     const adapter = new Memory<DatabaseSchema>('')
    //     const db = low(adapter)
    //     db.defaults(memes).write()
    //     const query = 'brazil'
    //     request(createApp(db))
    //         .get('/api/memes?query=' + query)
    //         .expect(200)
    //         .then((response) => {
    //             response.body.forEach(element => {
    //                 expect(element.title).toContain(query)
    //             });
    //             done()
    //         })
    // })

})
