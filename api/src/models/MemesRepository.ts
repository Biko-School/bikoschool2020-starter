import { MemeSchema } from "./MemeSchema"
export interface MemesRepository {
    getRecentMemes: ({numRecentMemes: number}) => MemeSchema[];
    searchMemes: (searchTerm: string) => MemeSchema[];
}