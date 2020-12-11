import React from 'react';
import { useState, useEffect } from 'react'
import { Header, LogoWrapper } from './views/_components/Header/Header';
import { SearchBar, SearchContainer } from './views/_components/SearchBar/SearchBar';
import { GlobalContainer } from './views/_components/Container/Container';
import { LupaWraper, StyledLupa } from './views/_components/SearchBar/Lupa';
import { MemeListWraper } from './views/_components/memeList/MemeList';
import { MemeCard } from './views/_components/MemeCard/MemeCard';
import { MemeDetailWraper, MemeDetailSchema } from './views/_components/MemeDetail/MemeDetail';

import db from './db.json' // TODO: horrible lo se
// const MEMES_URL = 'http://localhost:3333/api/memes'

function MemeDetail() {

  const memeDetails = db.memes[9]

  return (
    <>
    <MemeDetailSchema
      id={memeDetails.id}
      url={memeDetails.images.original.url}
      tags={memeDetails.tags}
      title={memeDetails.title}
      authorName={memeDetails.user?.display_name}
      authorLogo={memeDetails.user?.avatar_url}
    />
    </>
  );
}

export default MemeDetail;
