import { Meme } from './domain/model/Meme'

export interface memeDatabase {
    getMemes(): Promise<Meme>

}       