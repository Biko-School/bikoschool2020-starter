import express, { Request, response, Response, Router } from 'express'
import logger from 'morgan'

import low, { lowdb } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './domain/model/DatabaseSchema'
import { deflateSync } from 'zlib'
import { Meme, MemeWeight } from './domain/model/Meme'
import { forbiddenWords } from './forbiddenWords'
import { sortMemesByDate } from './domain/Meme.service'
import { getRecentMemes } from './application/RecentMemes'
import { normalizeMeme } from "./domain/Meme.service"
import { weightMeme } from './domain/MemeWeight.service'
import { prepareSearchString } from './domain/Search.service'
import { searchMemes } from './application/SearchMemes'
import { memeRepositoryLowDb } from './infrastructure/memeDatabase'


// let adapter = null
// if(process.env.NODE_ENV === 'test'){
//     adapter = new FileSync('./db/testdb.json') 
// }else{
//     adapter = new FileSync('./db/db.json')
// } 

// const db = low(adapter)


export const filterMemeBySearchText = (meme: Meme, text: string): boolean => {
    let normalizedMeme = normalizeMeme(meme)
    if (text === '') return true
    const result = normalizedMeme.tags.find(tag => tag.includes(text))
    return Boolean(result)
}

const sortMemesByWeight = (meme1: MemeWeight, meme2: MemeWeight): number => {

    if(meme1.weight > meme2.weight){
        return -1
    }

    if(meme2.weight > meme1.weight){
        return 1
    }

    return sortMemesByDate(meme1.meme,meme2.meme)
    
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