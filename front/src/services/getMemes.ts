export interface Meme {
  id: string
  title: string
  url: string
  width: number
  height: number
  user?: {
    avatarUrl: string
    profileUrl: string
    displayName: string
  }
  tags: string[]
}

export async function getMemes(): Promise<Meme[]> {
  const apiResponse = await fetch('http://localhost:3000/api/memes')
  if (apiResponse.status !== 200) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}

export async function searchMemes(search: string): Promise<Meme[]> {
  if (search.length < 3) throw new Error('La longitud tiene que ser mayor de 3')
  const apiResponse = await fetch(
    'http://localhost:3000/api/memes?search=' + search,
  )
  if (apiResponse.status !== 200) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}
