import React from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Meme } from '../../core/domain/Meme/Meme';
import { getMemeDetail } from '../../core/domain/Meme/Memes.service';
import { fonts } from '../../ui/theme'

export const MemeDetail: React.FC=() =>{
    interface ParamTypes {
        id: string
    }

    const [meme,setMeme] = React.useState<Meme>({
        id: '',
        title: '',
        url: '',
        tags: [],
        userAvatar: "",
        userName: "",
        userDisplayName: ""
    })
    const { id } = useParams<ParamTypes>()
    React.useEffect(() => {
        getMemeDetail(id).then((meme) => {setMeme(meme)}).catch((error) => console.log('Error:',error))
    },[id])

    const UserName = styled.h3`
        ${fonts.H3()}
    `

    return (
        <>  
            <p>{meme.title}</p>
            <img key={meme.id} src={meme.url} alt={meme.title} ></img>
            <img src={meme.userAvatar} alt={meme.userName} />
            <UserName>{meme.userDisplayName}</UserName>
            {meme.tags.map((tag) => 
                <div key={tag}>{tag}</div>
            )}
        </>
    );
}

