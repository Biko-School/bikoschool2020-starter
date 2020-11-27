import { MemeSchema } from "./MemeSchema"

export interface MemesRepository {
    getAll(): MemeSchema[]
    getById(id: string): MemeSchema
}