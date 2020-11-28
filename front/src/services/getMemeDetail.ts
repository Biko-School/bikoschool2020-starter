import { MemeDetail } from '../views/_components/MemeDetail/MemeDetail'
import { HttpStatus } from './getMemes'

export const getMemeDetail = async function (
  idMeme: string,
): Promise<MemeDetail> {
  console.log('aqui no')
  const apiResponse = await fetch(
    process.env.REACT_APP_API_BASE_URL + '/meme?id=' + idMeme,
  )
  if (apiResponse.status !== HttpStatus.OK) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}
