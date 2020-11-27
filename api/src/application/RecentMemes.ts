import low, { lowdb } from 'lowdb'
import { DatabaseSchema } from '../domain/model/DatabaseSchema'
import { sortMemesByDate } from '../domain/Meme.service'
import { MemeRepository } from '../domain/MemeRepository'


export const getRecentMemes = (memeRepository:MemeRepository, numeroMemesXListado: number) => {
    let memes = memeRepository.getAllMemes()
    

    return  memes.sort(sortMemesByDate).slice(0, numeroMemesXListado)

}

