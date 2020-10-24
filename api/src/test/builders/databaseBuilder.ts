import { builtinModules } from 'module'
import {DatabaseSchema} from '../DatabaseSchema'
import {Meme} from '../MemeSchema'
import { aMeme } from './memeBuilder'

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
