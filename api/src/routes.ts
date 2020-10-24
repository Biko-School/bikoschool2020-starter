import Router from 'express'
import { LowdbSync } from 'lowdb'
import { DatabaseSchema } from 'test/interfaces/DatabaseSchema'
import { ConfigSchema } from './test/interfaces/ConfigSchema'

export function createRoutes(db:LowdbSync<DatabaseSchema>,configs: ConfigSchema){
    const routes = Router()

    routes.get('/memes',function(req,res){
        const memes = db.get("memes") 
                        .sortBy('import_datetime').reverse() 
                        .take(configs.numeroMemes)
                        .value() 
        res.status(200).json(memes)
    })

    return routes
}

