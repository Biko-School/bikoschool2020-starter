import React from 'react';
import styled from 'styled-components';
import { size, font, color } from '../../styles/theme';
import { MemeDetail } from '../../dtos/MemeDetail';
import { useParams } from 'react-router-dom';
import { getMemeById } from '../../services/meme-service';

const MemeTitle = styled.h2`
  ${font.h2(font.weight.bold)};
`;

const MemeImg = styled.img`
  border: 2px solid ${color.lightRed};
`;

const MemeDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${size.medium};
`;

const MemeData = styled.div`
  margin: 0 ${size.medium};
`;

/*const LogoIcon = styled(Logo)`
  width: ${size.medium};
  height: ${size.medium};
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 50%;
  padding: 0.3rem;
  text-align: center;
  justify-content: center;
`;*/

const TagsContainer = styled.div`
  display: flex;
  gap: ${size.mini};
`;

const MemeTag = styled.div`
  background-color: rgba(0, 0, 0, 0.62);
  border-radius: 3rem;
  color: ${color.white};
  padding: 0.5rem 1.5rem;
  display: inline-block;
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
      <MemeTitle>{meme.title}</MemeTitle>
      <MemeDetailContainer>
        <MemeImg src={meme.url} alt={meme.title} />
        <MemeData>
          {/*<MemeDataAuthor>
            <LogoIcon />
            <MemeAuthorTitle>{meme.author}<MemeAuthorTitle>
          </MemeDataAuthor>*/}
          <TagsContainer>
            {meme.tags.map((tag, idx) => {
              return <MemeTag key={idx}>#{tag}</MemeTag>;
            })}
          </TagsContainer>
        </MemeData>
      </MemeDetailContainer>
    </>
  );
};
