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
        const query: any = req.query.query
        if (query.length < 3) {
            res.status(401).json(errorObject)
        }
        const memes = db.get("memes")
                        .sortBy('import_datetime').reverse()
                        .filter((meme) => 
                            meme.tags.some((tag) =>
                            tag.toLowerCase().includes(query.toLowerCase()),
                        ))
                        .value()
                        console.log(memes)
        res.status(200).json(memes)  
    })

    return routes
}

