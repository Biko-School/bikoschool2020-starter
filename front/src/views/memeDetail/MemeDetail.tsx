import React from 'react';
import { useParams } from "react-router-dom";
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemeDetail } from '../../core/domain/Meme/Memes.service';

export const MemeDetail: React.FC=() =>{
    interface ParamTypes {
        id: string
    }

    const [meme,setMeme] = React.useState<Meme>({
        id: '',
        title: '',
        url: '',
        tags: []
    })
    const { id } = useParams<ParamTypes>()
    React.useEffect(() => {
        getMemeDetail(id).then((meme) => {setMeme(meme)}).catch((error) => console.log('Error:',error))
    },[id])

  
    return (
        <>  
            <p>{meme.title}</p>
            <img key={meme.id} src={meme.url} alt={meme.title} ></img>
        </>
    );
}
