import {Meme} from './Meme'

export function mapMeme(aMeme : any){
    let baseMeme: Meme = {
        id: aMeme.id,
        title: aMeme.title,
        url: aMeme.images.original.url,
        tags: aMeme.tags
    }
    return baseMeme
} 