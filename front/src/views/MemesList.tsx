import React from 'react';
import styled from 'styled-components';
import { size, font, color } from '../styles/theme';
import { MemeThumb } from '../dtos/MemeThumb';
import { getMemesBySearchTerm, getRecentMemes } from '../services/meme-service';
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

export const MemesList = function (props: { searchTerm?: string }) {
  const [memes, setMemes] = React.useState<Array<MemeThumb>>([]);
  const [titleText, setTitleText] = React.useState<string>(
    'Los guif más trendings del momento',
  );
  const searchTerm = props.searchTerm || '';

  React.useEffect(() => {
    let apiRsp;
    if (searchTerm === '') {
      apiRsp = getRecentMemes();
      setTitleText('Los guif más trendings del momento');
    } else {
      apiRsp = getMemesBySearchTerm(searchTerm);
      setTitleText(`Búsqueda: ${searchTerm}`);
    }
    apiRsp.then(setMemes).catch((err) => {
      console.log('error al obtener el listado de memes' + err);
    });
  }, [searchTerm]);

  if (!memes) {
    return null;
  }
  const listMemes = memes?.map((meme) => {
    return <MemeListItem meme={meme} key={meme.id} width={200} />;
  });
  return (
    <>
      <RecentMemesTitle>
        <TrendingImgStyled />
        {titleText}
      </RecentMemesTitle>
      <RecentMemesListCont>{listMemes}</RecentMemesListCont>
    </>
  );
};
