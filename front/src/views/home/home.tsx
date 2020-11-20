import React from 'react';
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemes } from '../../core/domain/Meme/Memes.service'
import { Buscador } from './_components/Buscador'
import { MemesList } from './_components/MemesList'

export const Home: React.FC=() =>{
    const [memes,setMemes] = React.useState<Meme[]>([])
    const [hasError, setHasError] = React.useState<boolean>(false)

    React.useEffect(() => {
        getMemes().then(setMemes)
    },[])
    return (
        <>  
            <Buscador hasError={hasError}/>
            <MemesList memes={memes} />
        </>
    );
}
