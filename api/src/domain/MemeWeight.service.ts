import { Meme, MemeWeight } from "./model/Meme"
import { normalizeMeme, sortMemesByDate } from "./Meme.service"

export const sortMemesByWeight = (meme1: MemeWeight, meme2: MemeWeight): number => {
    if(meme1.weight > meme2.weight){
        return -1
    } else if (meme1.weight < meme2.weight) {
        return 1
    } else {
        return sortMemesByDate(meme1.meme,meme2.meme)
    }
}

export const weightMeme = (meme: Meme, text: string): MemeWeight => {
    let normalizedMeme = normalizeMeme(meme)
    let memeWeight: MemeWeight = {
        meme: meme,
        weight: 0
    }

    normalizedMeme.tags.forEach(tag => {
        if(tag === text){
            memeWeight.weight += 2
        }else if(tag.includes(text)){
            memeWeight.weight += 1
        }
    });

    return memeWeight;
}
