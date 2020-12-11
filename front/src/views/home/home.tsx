import React from 'react';
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemes, searchMemes } from '../../core/domain/Meme/Memes.service'
import { Buscador } from './_components/Buscador'
import { MemesList } from './_components/MemesList'
import { ArrowImage } from './_components/ArrowImage'

export const Home: React.FC=() =>{
    const [memes,setMemes] = React.useState<Meme[]>([])
    const [hasErrors, setHasErrors] = React.useState<Boolean>(false)

    const handleSearch = async (text: string) => {
      return searchMemes(text)
        .then((data) => {
          setMemes(data)
        })
        .catch((error) => {
          console.log(error)
          setHasErrors(true)
        })
    }

    React.useEffect(() => {
        getMemes().then(setMemes).catch((error) => console.log('Error:',error))
    },[])

    return (
        <>  
            <Buscador onSearch={(query) => handleSearch(query)} />
            {hasErrors && <span>El texto de búsqueda necesita ser mayor que dos caracteres</span>}
            <ArrowImage /><h3>Los gif más trending del momento</h3>
            <MemesList memes={memes} />
        </>
    );
}
