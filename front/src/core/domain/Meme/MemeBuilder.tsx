import {Meme} from './Meme'

export function mapMeme(aMeme : any){
    let baseMeme: Meme = {
        id: aMeme.id,
        title: aMeme.title,
        url: aMeme.images.original.url,
        tags: aMeme.tags,
        userAvatar: aMeme.user ? aMeme.user.avatar_url : "",
        userName: aMeme.username,
        userDisplayName: aMeme.user ? aMeme.user.display_name : ""
    }
    return baseMeme
} 