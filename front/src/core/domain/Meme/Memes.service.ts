import { Meme } from './Meme'

export async function getMemes(): Promise<Meme[]>{
  const response = await fetch("/api/memes")
  const {memes} = await response.json()
  return memes
}

export async function getMemeDetail(id:string): Promise<Meme>{
  const response = await fetch("/api/meme/"+id)
  const {memes} = await response.json()
  return memes
}

export async function searchMemes(query:string): Promise<Meme[]>{
  const response = await fetch("/api/memes/search?query="+query)
  //const {memes} = await response.json()
  const jsonResponse = await response.json()
  if (!response.ok)
    throw new Error(
      jsonResponse.message,
    )
  return jsonResponse.memes
}