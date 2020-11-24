import express, { Request, response, Response, Router } from 'express'
import logger from 'morgan'

import low, { lowdb } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from '../domain/model/DatabaseSchema'
import { deflateSync } from 'zlib'
import { MemeRepository } from 'domain/MemeRepository'
import { Meme } from 'domain/model/Meme'

let db: low.LowdbSync<DatabaseSchema>

const initialize = (lowDB: low.LowdbSync<DatabaseSchema>) => {
    db = lowDB
}

const getAllMemes = () => {
    const results = db.get('memes').value()
    return results
}

export const memeRepositoryLowDb: MemeRepository = {
    initialize,
    getAllMemes
}