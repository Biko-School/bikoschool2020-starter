import { Request, Router } from 'express'

import low from 'lowdb'
import { DatabaseSchema } from './domain/model/DatabaseSchema'
import { Meme } from './domain/model/Meme'
import { getRecentMemes } from './application/RecentMemes'
import { normalizeMeme } from "./domain/Meme.service"
import { searchMemes } from './application/SearchMemes'
import { memeRepositoryLowDb } from './infrastructure/memeDatabase'



export const filterMemeBySearchText = (meme: Meme, text: string): boolean => {
    let normalizedMeme = normalizeMeme(meme)
    if (text === '') return true
    const result = normalizedMeme.tags.find(tag => tag.includes(text))
    return Boolean(result)
}


const obtainQueryFromText = (req: Request): string => {
    return req.query.search ? req.query.search as string : ''
}

const createRoutes = (db: low.LowdbSync<DatabaseSchema>, numeroMemesXListado: number) => {

    const routes = Router()

    routes.use('/memes', (req, res) => {

        const textoDeBusqueda = obtainQueryFromText(req)
        let results: Meme[] = []
        if(textoDeBusqueda !==''){
            results = searchMemes(memeRepositoryLowDb, numeroMemesXListado, textoDeBusqueda).map(element => element.meme)

        }else{
            results = getRecentMemes(memeRepositoryLowDb,numeroMemesXListado)
        }
        
        res.status(200)
        res.send(results)
    })

    return routes
}


export default createRoutes