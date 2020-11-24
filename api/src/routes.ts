import Router from 'express'
import { LowdbSync } from 'lowdb'
import { DatabaseSchema } from 'test/interfaces/DatabaseSchema'
import { ConfigSchema } from './test/interfaces/ConfigSchema'

export function createRoutes(db:LowdbSync<DatabaseSchema>,configs: ConfigSchema){
    const routes = Router()

    const errorObject = { "message": "El texto de búsqueda necesita ser mayor que dos caracteres"}

    routes.get('/memes',function(req,res){
        const memes = db.get("memes") 
                        .sortBy('import_datetime').reverse() 
                        .take(configs.numeroMemes)
                        .value() 
        res.status(200).json(memes)
    })

    routes.get('/memes/search', (req, res) => {
        console.log(req.query)
        if (req.query.query.length < 3) {
          res.status(401).json(errorObject)
        }
        
    })

    return routes
}

