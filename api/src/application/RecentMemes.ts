import { sortMemesByDate } from '../domain/Meme.service'
import { MemeRepository } from '../domain/MemeRepository'


export const getRecentMemes = (memeRepository:MemeRepository, numeroMemesXListado: number) => {
    let memes = memeRepository.getAllMemes()
    

    return  memes.sort(sortMemesByDate).slice(0, numeroMemesXListado)

}

