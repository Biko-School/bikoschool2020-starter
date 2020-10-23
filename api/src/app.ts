import { DatabaseSchema } from 'DatabaseSchema'
import express from 'express'
import { LowdbSync } from 'lowdb'
import logger from 'morgan'
import {createRoutes} from './routes'

export function createApp(db:LowdbSync<DatabaseSchema>){
    const app = express()

    // Shows request log on terminal
    // https://github.com/expressjs/morgan
    if (process.env.NODE_ENV !== 'test'){
        app.use(logger('combined'))
    }

    // Parses incoming requests with JSON payloads
    // http://expressjs.com/es/api.html#express.json
    app.use(express.json())

    // Parses incoming requests with urlencoded payloads
    // http://expressjs.com/es/api.html#express.urlencoded
    app.use(express.urlencoded({ extended: false }))

    
    app.use('/api',createRoutes(db))

    return app
}

