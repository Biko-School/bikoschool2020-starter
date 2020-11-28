
import low from 'lowdb'
import { DatabaseSchema } from '../domain/model/DatabaseSchema'
import { MemeRepository } from '../domain/MemeRepository'

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