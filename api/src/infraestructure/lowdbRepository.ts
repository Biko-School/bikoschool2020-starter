import { MemesRepository } from "./../models/MemesRepository"
import { MemeDto } from "./../models/MemeDto"
import { DatabaseSchema } from './../models/DatabaseSchema'
import Lowdb from 'lowdb'

export class LowDbMemesRepository implements MemesRepository {
    constructor (private db: Lowdb.LowdbSync<DatabaseSchema> ) {}
    
    getRecentMemes({ numRecentMemes }): MemeDto[] {
        return this.db
                .get('memes')
                .sortBy('import_datetime')
                .reverse()
                .take(numRecentMemes)
                .value()
    }

    searchMemes(searchTerm: string): MemeDto[] {
        return this.db
                .get('memes')
                .filter((meme) => {
                    return meme.tags.some((tag) => tag.includes(searchTerm))
                })
                .sortBy('import_datetime')
                .reverse()
                .value()
    }
}