import React from 'react';
import styled from 'styled-components';
import { size, font, color } from '../../styles/theme';
import { MemeThumb } from '../../dtos/MemeThumb';
import {
  getMemesBySearchTerm,
  getRecentMemes,
} from '../../services/meme-service';
import { TrendingImg } from '../components/TrendingSvg';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';

const RecentMemesTitle = styled.header`
  ${font.h3(font.weight.bold)};
  color: ${color.white};
  margin-bottom: ${size.base};
`;

const TrendingImgStyled = styled(TrendingImg)`
  width: 25px;
  height: 25px;
  margin-right: ${size.small};
`;

const RecentMemesListCont = styled.div`
  column-count: 5;
  column-gap: ${size.medium};
  column-width: 200px;
`;

const MemeListItemCont = styled.article`
  margin-bottom: ${size.medium};
`;

const EmptyListMsg = styled.p`
  text-align: center;
  ${font.h3(font.weight.bold)};
`;

const MemeListItem = (props: { meme: MemeThumb }) => {
  return (
    <MemeListItemCont>
      <Link to={'/meme/' + props.meme.id}>
        <img
          width={props.meme.width}
          height={props.meme.height}
          alt={props.meme.title}
          src={props.meme.url}
        />
      </Link>
    </MemeListItemCont>
  );
};

export const MemesList = function (props: {}) {
  const [memes, setMemes] = React.useState<Array<MemeThumb>>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [emptyListMsg, setEmptyListMsg] = React.useState<string>('');

  //let memes: Array<MemeThumb> = [];
  let titleText = 'Los guif más trendings del momento';

  React.useEffect(() => {
    if (searchTerm === '') {
      getRecentMemes()
        .then((rspMemes) => {
          setMemes(rspMemes);
          setEmptyListMsg(rspMemes.length > 0 ? '' : 'No hay resultados');
        })
        .catch((err) => {
          setMemes([]);
          setEmptyListMsg('Ha ocurrido un error');
          console.log('error al obtener el listado de memes' + err);
        });
    } else {
      getMemesBySearchTerm(searchTerm as string)
        .then((rspMemes) => {
          setMemes(rspMemes);
          setEmptyListMsg(rspMemes.length > 0 ? '' : 'No hay resultados');
        })
        .catch((err) => {
          setMemes([]);
          setEmptyListMsg('Ha ocurrido un error');
          console.log('error al obtener el listado de memes' + err);
        });
    }
  }, [searchTerm]);

  if (searchTerm === '') {
    titleText = 'Los guif más trendings del momento';
  } else {
    titleText = `Búsqueda: ${searchTerm}`;
  }

  return (
    <>
      <SearchBar onSearchRequested={setSearchTerm}></SearchBar>
      <RecentMemesTitle>
        <TrendingImgStyled />
        {titleText}
      </RecentMemesTitle>
      {memes.length === 0 ? (
        <EmptyListMsg>{emptyListMsg}</EmptyListMsg>
      ) : (
        <RecentMemesListCont>
          {memes?.map((meme) => (
            <MemeListItem key={meme.id} meme={meme} />
          ))}
        </RecentMemesListCont>
      )}
    </>
  );
};
