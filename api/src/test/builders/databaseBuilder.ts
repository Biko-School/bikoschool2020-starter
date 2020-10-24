import {DatabaseSchema} from '../interfaces/DatabaseSchema'
import {Meme} from '../interfaces/MemeSchema'

export function aDatabase(){
    let baseDb: DatabaseSchema = {
        memes: []
    }
    return{
        withMemes(arrayMemes: Meme[]){
            arrayMemes.forEach(meme => baseDb.memes.push(meme))
            return this
        },
        build(){
            return baseDb
        }
    }
}
