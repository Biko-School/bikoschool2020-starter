import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'

export interface MemeServicePort {
  getTrendingMemes(): MemeSchema[]
}
