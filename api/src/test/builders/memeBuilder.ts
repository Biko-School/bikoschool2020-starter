import { builtinModules } from 'module'
import {Meme} from '../interfaces/MemeSchema'

export function aMeme(){
    let baseMeme: Meme = {
        title: 'irrelevant',
        import_datetime: '1900-01-01 00:00:00',
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
        build(){
            return baseMeme
        }
    }
} 