import express, {  } from 'express'
import logger from 'morgan'
import createRoutes from './routes'
import low from 'lowdb'
import { DatabaseSchema } from './domain/model/DatabaseSchema' 
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



