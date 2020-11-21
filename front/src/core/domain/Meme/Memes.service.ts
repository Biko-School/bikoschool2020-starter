import { Meme } from './Meme'

export async function getMemes(): Promise<Meme[]>{
    const response = await fetch("/api/memes")
    const {memes} = await response.json()
    return memes
}

export async function searchMemes(): Promise<Meme[]>{
    const response = await fetch("/api/memes/search")
    const {memes} = await response.json()
    return memes
}