import { Meme } from './model/meme'

export interface memeDatabase {
    getMemes(): Promise<Meme>

}       