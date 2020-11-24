import { Meme } from "./model/Meme";

export interface MemeRepository {
    initialize: (db: any) => void
    getAllMemes: () => Meme[]
}