import React from 'react';
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemes } from '../../core/domain/Meme/Memes.service'
import { Buscador } from './Buscador'
import { MemesList } from './MemesList'

export const Home: React.FC=() =>{
    const [memes,setMemes] = React.useState<Meme[]>([])

    React.useEffect(() => {
        getMemes().then(setMemes)
    },[])
    return (
        <>
            <Buscador/>
            <MemesList memes={memes} />
        </>
    );
}
