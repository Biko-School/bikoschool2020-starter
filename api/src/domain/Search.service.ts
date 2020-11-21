import { forbiddenWords } from "../forbiddenWords";


const replaceEmptyCharacters = (text: string) => {
    return text.replace(/\s+/g, ' ').trim();
}

const cleanForbiddenWordsFromSearchString = (search: string):string =>{ 

    let cleanSearch = search

    for(let word of forbiddenWords){
        if(cleanSearch.includes(word)){
            cleanSearch = cleanSearch.replace(word,'')
        }
    }

    return cleanSearch
}

export const prepareSearchString = (text: string) => {
    let result = cleanForbiddenWordsFromSearchString(text)
    result = replaceEmptyCharacters(result)
    return result.toLowerCase()
}
