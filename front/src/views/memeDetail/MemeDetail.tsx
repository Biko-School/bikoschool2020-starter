import React from 'react';
import {
  useParams
} from "react-router-dom";
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemeDetail } from '../../core/domain/Meme/Memes.service';

export const MemeDetail: React.FC=() =>{
    interface ParamTypes {
        id: string
    }

    const [meme,setMeme] = React.useState<Meme>()
    const { id } = useParams<ParamTypes>()
    React.useEffect(() => {
        getMemeDetail(id).then((meme) => {setMeme(meme); console.log(meme)}).catch((error) => console.log('Error:',error))
    },[id])

  
    return (
        <>  
            <p>{meme?.title}</p>
        </>
    );
}
