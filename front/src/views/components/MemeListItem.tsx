import React from 'react';
import { MemeThumb } from '../../../../api/memesInterfaces';

interface MemeListItemOptions {
  meme: MemeThumb;
  width: number;
}

export const MemeListItem = ({ meme, width }: MemeListItemOptions) => {
  return (
    <article key={meme.id}>
      <img width={width} alt={meme.title} src={meme.url} />
    </article>
  );
};
