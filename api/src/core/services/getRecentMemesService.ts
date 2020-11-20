import { MemeRepository } from '../../core/domain/MemeRepository'

export const getRecentMemes = (
  memeRepository: MemeRepository,
  numberOfMemesToReturn: number,
) => {
  return memeRepository.findRecent(numberOfMemesToReturn)
}
