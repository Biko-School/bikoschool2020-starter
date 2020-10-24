import express, { Request, Response, Router } from 'express'
import logger from 'morgan'

import low, { lowdb } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from 'model/DatabaseSchema'
import { deflateSync } from 'zlib'

// let adapter = null
// if(process.env.NODE_ENV === 'test'){
//     adapter = new FileSync('./db/testdb.json') 
// }else{
//     adapter = new FileSync('./db/db.json')
// } 

// const db = low(adapter)


const createRoutes = (db: low.LowdbSync<DatabaseSchema>,numeroMemesXListado: number) => {

    const routes = Router()

    routes.use('/memes', (req, res) => {

        res.status(200)

        let textoDeBusqueda: string = req.query.query? req.query.query as string : ''

        var results = db.get('memes')
        .filter( meme => meme.title.includes(textoDeBusqueda))
        .sort((meme1, meme2) => {
            let date1 = new Date(meme1.import_datetime).getTime()
            let date2 = new Date(meme2.import_datetime).getTime()
            
            if(date1>date2){
                return -1
            }
            return 1
        })
        .take(numeroMemesXListado)
        .value()

        res.send(results)
    })

    return routes
}


export default createRoutes