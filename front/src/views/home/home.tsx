import React from 'react';
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemes, searchMemes } from '../../core/domain/Meme/Memes.service'
import { Buscador } from './_components/Buscador'
import { MemesList } from './_components/MemesList'

export const Home: React.FC=() =>{
    const [memes,setMemes] = React.useState<Meme[]>([])
    const [query,setQuery] = React.useState<string>('')
    const [hasErrors, setHasErrors] = React.useState<Boolean>(false)

    function onSearch(text:string){
        setQuery(text)
    }

    React.useEffect(() =>{
        searchMemes(query).then(setMemes)
    },[query])

    React.useEffect(() => {
        getMemes().then(setMemes)
    },[])

    return (
        <>  
            <Buscador onSearch={onSearch}/>
            {hasErrors && <span>El texto de búsqueda necesita ser mayor que dos caracteres</span>}
            <MemesList memes={memes} />
        </>
    );
}
