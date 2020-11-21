import { memeRepository } from '../infrastructure/memeDatabase'
import low, { lowdb } from 'lowdb'
import { DatabaseSchema } from '../domain/DatabaseSchema'
import { sortMemesByDate } from '../domain/Meme.service'


export const getRecentMemes = (db:low.LowdbSync<DatabaseSchema>, numeroMemesXListado: number) => {
    let results = memeRepository.getAllMemes(db)
            .sort(sortMemesByDate)
            .take(numeroMemesXListado)
    return results
}