import React from 'react';
import styled from 'styled-components';
import { size, font, color } from '../styles/theme';
import { RecentMemesData } from '../../../api/memesInterfaces';
import { getRecentMemes } from '../services/meme-service';
import { MemeListItem } from './components/MemeListItem';
import { TrendingImg } from './components/TrendingSvg';

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

export const RecentMemesList = function () {
  const [recentMemes, setRecentMemes] = React.useState<RecentMemesData>();

  React.useEffect(() => {
    getRecentMemes().then(setRecentMemes, (err) => {
      console.log('error al obtener el listado de memes' + err);
    });
  }, []);

  if (!recentMemes) {
    return null;
  }
  const listMemes = recentMemes?.memes.map((meme) => {
    return <MemeListItem meme={meme} key={meme.id} width={200} />;
  });
  return (
    <>
      <RecentMemesTitle>
        <TrendingImgStyled />
        Los guif más trendings del momento
      </RecentMemesTitle>
      <RecentMemesListCont>{listMemes}</RecentMemesListCont>
    </>
  );
};
