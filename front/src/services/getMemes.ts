const _MINIMUM_QUERY_LENGTH = 3

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
  const apiResponse = await fetch(process.env.REACT_APP_API_BASE_URL + '/memes')
  if (apiResponse.status !== HttpStatus.OK) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}

export async function searchMemes(search: string): Promise<Meme[]> {
  if (search.length < _MINIMUM_QUERY_LENGTH)
    throw new Error(
      'La longitud tiene que ser mayor de ' + _MINIMUM_QUERY_LENGTH,
    )
  const apiResponse = await fetch(
    process.env.REACT_APP_API_BASE_URL + '/memes?search=' + search,
  )
  if (apiResponse.status !== HttpStatus.OK) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}

export const HttpStatus = {
  OK: 200,
}
