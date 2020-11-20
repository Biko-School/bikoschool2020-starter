import { MemeResponse } from 'core/domain/MemeResponse'

export interface MemeRepository {
  initialize: (db: any) => void
  findRecent: (numberOfMemesToReturn: number) => MemeResponse[]
  filterByTag: (tagFilter: string) => void
}
