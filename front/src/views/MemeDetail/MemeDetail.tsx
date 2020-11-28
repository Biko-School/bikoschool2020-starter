import React from 'react';
import styled from 'styled-components';
import { size, font, color } from '../../styles/theme';
import { MemeDetail } from '../../dtos/MemeDetail';
import { Logo } from '../components/Logo';
import { useParams } from 'react-router-dom';
import { getMemeById } from '../../services/meme-service';

const MemeDataAuthor = styled.div`
  display: flex;
`;

const MemeImg = styled.img``;

const MemeDataContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const MemeData = styled.div`
  margin: 0 1.5rem;
`;

const LikeBox = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
`;

const LogoIcon = styled(Logo)`
  width: ${size.medium};
  height: ${size.medium};
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 50%;
  padding: 0.3rem;
  text-align: center;
  justify-content: center;
`;
const TagContainer = styled.div`
  display: flex;
  margin: 0.75rem 0;
`;
const MemeTag = styled.div`
  background-color: rgba(0, 0, 0, 0.62);
  border-radius: 3rem;
  color: ${color.white};
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin: 0 0.75rem;
`;

interface ParamTypes {
  id: string;
}

//export const MemeDetailComponent = (props: { memeId: string }) => {
export const MemeDetailComponent = () => {
  const [meme, setMeme] = React.useState<MemeDetail | null>(null);

  let { id } = useParams<ParamTypes>();

  React.useEffect(() => {
    getMemeById(id)
      .then(setMeme)
      .catch((err) =>
        console.log('error al obtener el listado de memes' + err),
      );
  }, [id]);

  if (meme === null) return <></>;

  return (
    <>
      <h2 className="meme-detail">
        {meme.title} by {meme.author}
      </h2>
      <MemeDataContainer>
        <img src={meme.url} />
        <MemeData>
          <MemeDataAuthor>
            <LogoIcon />
            <h3 className="meme-author">{meme.author}</h3>
          </MemeDataAuthor>
          {meme.tags.map((tag, idx) => {
            return <MemeTag key={idx}>#{tag}</MemeTag>;
          })}
        </MemeData>
      </MemeDataContainer>
    </>
  );
};
