import express, { Request, response, Response, Router } from 'express'
import logger from 'morgan'

import low, { lowdb } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from 'model/DatabaseSchema'
import { deflateSync } from 'zlib'
import { Meme } from 'model/meme'

// let adapter = null
// if(process.env.NODE_ENV === 'test'){
//     adapter = new FileSync('./db/testdb.json') 
// }else{
//     adapter = new FileSync('./db/db.json')
// } 

// const db = low(adapter)
const replaceEmptyCharacters = (text: string) => {
    return text.replace(/\s+/g, ' ').trim();
}

const prepareSearchString = (text: string) => {
    let result = replaceEmptyCharacters(text)
    return result.toLowerCase()
}

const normalizeMeme = (meme: Meme): Meme => {
    let result = { ...meme };
    result.tags = result.tags.map(tag => tag.toLowerCase())
    return result
}

const filterMemeBySearchText = (meme: Meme, text: string): boolean => {
    let normalizedMeme = normalizeMeme(meme)

    if (text === '') return true
    const result = normalizedMeme.tags.find(tag => tag.includes(text))
    return Boolean(result)


}

const sortMemesByDate = (meme1: Meme, meme2: Meme): number => {
    let date1 = new Date(meme1.import_datetime).getTime()
    let date2 = new Date(meme2.import_datetime).getTime()

    if (date1 > date2) {
        return -1
    }
    return 1
}

const obtainQueryFromText = (req: Request): string => {
    //return req.query.search ? req.query.search as string : ''
    const query = req.query.search

    if (query && query instanceof String) {
        return query as string
    }
    return ''
}


const createRoutes = (db: low.LowdbSync<DatabaseSchema>, numeroMemesXListado: number) => {

    const routes = Router()

    routes.use('/memes', (req, res) => {

        // const textoDeBusqueda = obtainQueryFromText(req)
        const textoDeBusqueda = req.query.search ? req.query.search as string : ''
        const textoBusquedaFormateado = prepareSearchString(textoDeBusqueda)

        var results = db.get('memes')
            .filter(meme => filterMemeBySearchText(meme, textoBusquedaFormateado))
            .sort(sortMemesByDate)
            .take(numeroMemesXListado)
            .value()

        res.status(200)
        res.send(results)
    })

    return routes
}


export default createRoutes