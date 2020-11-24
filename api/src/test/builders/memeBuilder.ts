import { builtinModules } from 'module'
import {Meme} from '../interfaces/MemeSchema'

export function aMeme(){
    let baseMeme: Meme = {
        title: 'irrelevant',
        import_datetime: '1900-01-01 00:00:00',
        tags: ["#marcos","#galvez"]
    }
    return{
        withDate(date: string){
            baseMeme.import_datetime = date
            return this
        },
        withTitle(newTitle: string){
            baseMeme.title = newTitle
            return this
        },
        withTags(tags: string[]){
            baseMeme.tags = tags
            return this
        },
        build(){
            return baseMeme
        }
    }
} 