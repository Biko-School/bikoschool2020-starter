import Router from 'express'
import { LowdbSync } from 'lowdb'
import { DatabaseSchema } from 'DatabaseSchema'
import { doesNotMatch } from 'assert'

export function createRoutes(db:LowdbSync<DatabaseSchema>){
    const routes = Router()

    routes.get('/memes',function(req,res){
        //const memes = db.get('memes').take(50).value()
        const memes = db.get("memes") // Busca dentro de memes
                        .sortBy('import_datetime').reverse() // Ordenalos por el campo date
                        .take(50) // Toma los primeros 50
                        .value() // Devuelveme el valor
        res.status(200).json(memes)
    })

    return routes
}

