import { MemeLowDbRepository } from '../infrastructure/MemeLowDbRepository'
import Lowdb from 'lowdb'
import { DatabaseSchema } from 'core/infrastructure/model/DatabaseSchema'
import { MemeDb } from 'core/infrastructure/model/MemeDb'
import { MemeResponse } from 'core/domain/MemeResponse'
import { MemeRepository } from 'core/domain/MemeRepository'

export const getRecentMemes = (
  memeRepository: MemeRepository,
  numberOfMemesToReturn: number,
) => {
  return memeRepository.findRecent(numberOfMemesToReturn)
}
