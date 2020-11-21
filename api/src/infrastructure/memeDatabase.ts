import express, { Request, response, Response, Router } from 'express'
import logger from 'morgan'

import low, { lowdb } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from '../domain/DatabaseSchema'
import { deflateSync } from 'zlib'
import { MemeRepository } from 'domain/MemeRepository'
import { Meme } from 'domain/model/Meme'


const getAllMemes = (db: low.LowdbSync<DatabaseSchema>) => {
    const results = db.get('memes')
    return results
}

export const memeRepository = {
    getAllMemes
}

class MemeRepostitoryImpl implements MemeRepository  {
    getAllMemes: Meme[]
    
}