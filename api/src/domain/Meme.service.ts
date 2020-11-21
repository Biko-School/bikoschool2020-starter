import { Meme, MemeWeight } from "./model/Meme"


export const sortMemesByDate = (meme1: Meme, meme2: Meme): number => {
    let date1 = new Date(meme1.import_datetime).getTime()
    let date2 = new Date(meme2.import_datetime).getTime()

    if (date1 > date2) {
        return -1
    }
    return 1
}

export const normalizeMeme = (meme: Meme): Meme => {
    let result = { ...meme };
    result.tags = result.tags.map(tag => tag.toLowerCase())
    return result
}