import { MemeDto } from "./MemeDto"
export interface MemesRepository {
    getRecentMemes: ({numRecentMemes: number}) => MemeDto[];
    searchMemes: (searchTerm: string) => MemeDto[];
}