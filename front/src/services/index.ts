import { Meme } from "../models/Meme"
import { MemeDetails } from "../models/MemeDetails"

export async function getMemes(): Promise<Meme[]> {
    const response = await fetch('http://localhost:5000/api/memes')
    const { memes } = await response.json()
    return memes
}
  
export async function searchMemes(term: string): Promise<Meme[]> {
    const response = await fetch(
        'http://localhost:5000/api/memes/search?q=' + term,
    )
    const { memes } = await response.json()
    return memes
}

export async function getMeme(id: string): Promise<MemeDetails> {
    const response = await fetch(`http://localhost:5000/api/meme/${id}`)
    return response.json()
  }