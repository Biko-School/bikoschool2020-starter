import { Meme } from "./meme";

export interface MemeRepository {
    getAllMemes: Meme[]
}