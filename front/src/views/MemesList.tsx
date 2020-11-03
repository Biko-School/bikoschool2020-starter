import React from 'react';
import styled from 'styled-components';
import { size } from '../styles/theme';
import { RecentMemesData } from '../../../api/memesInterfaces';
import { getRecentMemes } from '../services/meme-service';
import { MemeListItem } from './components/MemeListItem';

const RecentMemesListCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${size.medium};
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
  return <RecentMemesListCont>{listMemes}</RecentMemesListCont>;
};
