import React from 'react';
import { MemeThumb } from '../../dtos/MemeThumb';
import styled from 'styled-components';
import { size } from '../../styles/theme';

interface MemeListItemOptions {
  meme: MemeThumb;
  width: number;
}

const MemeListItemCont = styled.article`
  margin-bottom: ${size.medium};
`;

export const MemeListItem = ({ meme, width }: MemeListItemOptions) => {
  return (
    <MemeListItemCont>
      <img width={width} alt={meme.title} src={meme.url} />
    </MemeListItemCont>
  );
};
