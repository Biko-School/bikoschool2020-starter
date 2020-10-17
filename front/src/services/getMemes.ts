export interface Meme {
  id: string
  title: string
  url: string
}

export async function getMemes(): Promise<Meme[]> {
  const apiResponse = await fetch('/api/memes')
  if (apiResponse.status != 200) throw new Error('Error')
  const result = apiResponse.json()
  return result
}
