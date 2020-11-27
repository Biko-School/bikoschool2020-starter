import { Meme, MemeWeight } from "../domain/model/Meme"
import express, { Request, response, Response, Router } from 'express'
import { filterMemeBySearchText } from "../routes"
import { sortMemesByWeightAndThenByDate, weightMeme } from "../domain/MemeWeight.service"
import low, { lowdb } from 'lowdb'
import { DatabaseSchema } from "../domain/model/DatabaseSchema"
import { prepareSearchString } from "../domain/Search.service"
import { MemeRepository } from "domain/MemeRepository"
import { sortMemesByDate } from "../domain/Meme.service"


export const searchMemes = (memeRepository: MemeRepository ,numeroMemesXListado:number,textoDeBusqueda: string): MemeWeight[] => {
    const textoBusquedaFormateado = prepareSearchString(textoDeBusqueda)
    let results = memeRepository.getAllMemes()
    .filter(meme => filterMemeBySearchText(meme, textoBusquedaFormateado))
    .map(meme => weightMeme(meme, textoBusquedaFormateado))
    .sort(sortMemesByWeightAndThenByDate)
    .slice(0, numeroMemesXListado);
    
    return results
}