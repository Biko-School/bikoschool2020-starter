import { ConfigSchema } from '../interfaces/ConfigSchema'

export function aConfig(){
    let baseAppConfigs: ConfigSchema = {
        numeroMemes: 50
    }
    return{
        withNumeroMemes(numero: number){
            baseAppConfigs.numeroMemes = numero
            return this
        },
        build(){
            return baseAppConfigs
        }
    }
}