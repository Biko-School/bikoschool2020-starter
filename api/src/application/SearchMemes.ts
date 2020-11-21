import { memeRepository } from "../infrastructure/memeDatabase"
import { Meme } from "../domain/model/Meme"
import express, { Request, response, Response, Router } from 'express'
import { filterMemeBySearchText } from "../routes"
import { sortMemesByWeight, weightMeme } from "../domain/MemeWeight.service"
import low, { lowdb } from 'lowdb'
import { DatabaseSchema } from "../domain/DatabaseSchema"
import { prepareSearchString } from "../domain/Search.service"


export const searchMemes = (db:low.LowdbSync<DatabaseSchema>,numeroMemesXListado:number,textoDeBusqueda: string): Meme[] => {
    const textoBusquedaFormateado = prepareSearchString(textoDeBusqueda)
    let results = memeRepository.getAllMemes(db)
    .filter(meme => filterMemeBySearchText(meme, textoBusquedaFormateado))
    .map(meme => weightMeme(meme, textoBusquedaFormateado))
    .sort(sortMemesByWeight)
    .take(numeroMemesXListado)
    .map(element => element.meme)
    .value()   
    
    return results
}