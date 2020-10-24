import { createApp } from './app'
import request from 'supertest'
import express from 'express'
import { assert } from 'console'
import { DatabaseSchema } from 'model/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import low from 'lowdb'
import memes from '../db/db.json'
import { aMeme } from './model/meme'

describe('Devuelve los 50 memes más recientes', () => {

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


    it('Devuelve los memes más recientes de la base de datos',(done) =>{
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
