import { createApp } from './app'
import request from 'supertest'
import express from 'express'
import { assert } from 'console'
import { DatabaseSchema } from './domain/model/DatabaseSchema'
import Memory from 'lowdb/adapters/Memory'
import low from 'lowdb'
import memes from '../db/db.json'
import { aMeme, MemeWeight } from './domain/model/Meme'
import { forbiddenWords } from './forbiddenWords'
import { weightMeme } from './domain/MemeWeight.service'
import { doesNotMatch } from 'assert'

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
            aMeme({ tags: ['simpsons','homer']}),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
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
            .get('/api/memes?search=homer')
            .expect(200)
            .then((response) => {
              
                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                })
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
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
            .get('/api/memes?search=hom')
            .expect(200)
            .then((response) => {

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('ignora los espacios de la izda y dcha de la busqueda',(done) => {
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
            .get('/api/memes?search=   hom     ')
            .expect(200)
            .then((response) => {

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('ignora los espacios múltiples dentro de la búsqueda',(done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags:['homer'] }),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags: ['simpsons family','homer']})
        ]

        const foundMemes = [
            aMeme({ tags: ['simpsons family','homer']})
        ]
        const notFoundMemes = [
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags:['homer'] }),
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,4))
            .get('/api/memes?search=simpsons   family')
            .expect(200)
            .then((response) => {

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('ignora las mayúsculas del texto de la busqueda',(done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags:['homer'] }),
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] }),
            aMeme({ tags: ['simpsons family','Homer']})
        ]

        const foundMemes = [
            aMeme({ tags: ['simpsons family','Homer']}),
            aMeme({ tags:['homer'] }),
        ]
        const notFoundMemes = [
            aMeme({ tags: ['marge'] }),
            aMeme({ tags: [] })
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()

        request(createApp(db,4))
            .get('/api/memes?search=HOMER')
            .expect(200)
            .then((response) => {

                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('Devuelve los memes ordenados por más recientes por busqueda realizada',(done) =>{
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ import_datetime: "2020-08-22 02:24:22", tags: ['Homer']}),
            aMeme({ import_datetime: "2020-08-19 02:24:22", tags: ['algo'] }),
            aMeme({ import_datetime: "2020-08-18 06:24:22" , tags:['gñe']}),
            aMeme({ import_datetime: "2020-08-20 02:24:22", tags: ['Simpsons','Homer'] }),
            aMeme({ import_datetime: "2020-08-21 02:24:22", tags: ['Simpsons','Homer'] }),
        ]

        const listadoOrdenadoMasRecientePorBusqueda = [
            aMeme({ import_datetime: "2020-08-22 02:24:22", tags: ['Homer']}),
            aMeme({ import_datetime: "2020-08-21 02:24:22", tags: ['Simpsons','Homer'] }),
            aMeme({ import_datetime: "2020-08-20 02:24:22", tags: ['Simpsons','Homer'] }),
        ]

        const myMemes = {
            memes: dbMemes
        }

        db.defaults(myMemes).write()
        
        request(createApp(db,5))
            .get('/api/memes?search=homer')
            .expect(200)
            .then((response) => {
                //TODO: preguntar si hay alguna manera más descriptiva de hacer esto
                expect(response.body).toEqual(listadoOrdenadoMasRecientePorBusqueda)
                done()
            })
    })


    it('No realiza búsquedas con las palabras prohibidas', (done) => {
        const adapter = new Memory<DatabaseSchema>('')
        const db = low(adapter)

        const dbMemes = [
            aMeme({ tags: ['culo'] }),
            aMeme({ tags: ['homer'] }),
        ]

        const foundMemes = [
            aMeme({ tags: ['homer'] }),  
        ]

        const notFoundMemes = [
            aMeme({ tags: ['culo'] }),
        ]

        const myMemes = {
            memes: dbMemes
        }
        
        db.defaults(myMemes).write()

        request(createApp(db,2))
            .get('/api/memes?search=homer culo')
            .expect(200)
            .then((response) => {
                foundMemes.forEach(element => {
                    expect(response.body).toContainEqual(element)
                });
                notFoundMemes.forEach(element => {
                    expect(response.body).not.toContainEqual(element)
                });

                done()
            })
    })

    it('asigna peso 1 y peso 2', (done) => {
    
        const dbMemes = [
            aMeme({ tags: ['homer','homer simpson'] }),
            aMeme({ tags: ['homero'] }),
            aMeme({ tags: ['homer']})
        ]

        const weightedMemes: MemeWeight[] = [
            { meme: aMeme({ tags: ['homer','homer simpson'] }), weight: 3} ,
            { meme: aMeme({ tags: ['homero'] }), weight: 1} ,
            { meme: aMeme({ tags: ['homer']}), weight:2},
        ]
        
        const querySearch = 'homer'
        dbMemes.forEach((element, idx) => {
            let weightedMeme = weightMeme(element, querySearch)
            expect(weightedMeme).toEqual(weightedMemes[idx])
        });
        done()

    })

    
})
