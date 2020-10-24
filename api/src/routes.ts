import Router from 'express'
import { LowdbSync } from 'lowdb'
import { DatabaseSchema } from 'test/DatabaseSchema'
import { doesNotMatch } from 'assert'

export function createRoutes(db:LowdbSync<DatabaseSchema>){
    const routes = Router()

    routes.get('/memes',function(req,res){
        const numeroMememes = 3
        const memes = db.get("memes") 
                        .sortBy('import_datetime').reverse() 
                        .take(numeroMememes)
                        .value() 
        res.status(200).json(memes)
    })

    return routes
}

