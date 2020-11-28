import { MemeWeight } from "../domain/model/Meme"
import { filterMemeBySearchText } from "../routes"
import { sortMemesByWeightAndThenByDate, weightMeme } from "../domain/MemeWeight.service"
import { prepareSearchString } from "../domain/Search.service"
import { MemeRepository } from "domain/MemeRepository"


export const searchMemes = (memeRepository: MemeRepository ,numeroMemesXListado:number,textoDeBusqueda: string): MemeWeight[] => {
    const textoBusquedaFormateado = prepareSearchString(textoDeBusqueda)
    let results = memeRepository.getAllMemes()
    .filter(meme => filterMemeBySearchText(meme, textoBusquedaFormateado))
    .map(meme => weightMeme(meme, textoBusquedaFormateado))
    .sort(sortMemesByWeightAndThenByDate)
    .slice(0, numeroMemesXListado);
    
    return results
}