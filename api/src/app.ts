import http from 'http'
import express, { Request, Response } from 'express'
import logger from 'morgan'
import createRoutes from './routes'
import FileSync from 'lowdb/adapters/FileSync'
import Memory from 'lowdb/adapters/Memory'
import low, { lowdb } from 'lowdb'
import { DatabaseSchema } from './domain/model/DatabaseSchema' 
import { MemoryMeasurement } from 'vm'
import cors from 'cors'
import { memeRepositoryLowDb } from './infrastructure/memeDatabase'


export const createApp = (db: low.LowdbSync<DatabaseSchema>,numeroMemesXListado: number ) => {
    const app = express()
    memeRepositoryLowDb.initialize(db)

    // Shows request log on terminal
    // https://github.com/expressjs/morgan
    if (process.env.NODE_ENV !== 'test')
        app.use(logger('combined'))

    // Parses incoming requests with JSON payloads
    // http://expressjs.com/es/api.html#express.json
    app.use(express.json())

    app.use(cors())

    // Parses incoming requests with urlencoded payloads
    // http://expressjs.com/es/api.html#express.urlencoded

    app.use(express.urlencoded({ extended: false }))
    .use('/api', createRoutes(db,numeroMemesXListado))
    
    return app
}



