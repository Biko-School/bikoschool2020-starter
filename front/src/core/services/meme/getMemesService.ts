import { FetchApiClient } from '../../infrastructure/FetchApiClient'
import { Meme } from '../../domain/meme/Meme'
import { MemesDataDTO } from '../../infrastructure/meme/MemesDataDTO'
import { convertJsonMemesToDomainMeme } from '../../infrastructure/meme/MemeMapper'

const apiClient = new FetchApiClient()

export async function getMemesData(): Promise<Meme[]> {
  const memesData = await apiClient.get<MemesDataDTO[]>('/memes')
  return convertJsonMemesToDomainMeme(memesData)
}

export async function searchMemeByText(queryText: string): Promise<Meme[]> {
  const memesData = await apiClient.get<MemesDataDTO[]>('/memes/' + queryText)
  return convertJsonMemesToDomainMeme(memesData)
}
