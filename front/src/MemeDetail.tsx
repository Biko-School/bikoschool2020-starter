import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import App from './App'
import MockMemeDetail from './fixtures/dbSampleMemeDetail.json'
import { useEffect, useState } from 'react'

interface Props {
  idMeme: string
}

const MemeDetail: React.FC<Props> = (props: Props) => {
  debugger
  const [memeDetail, setMemeDetail] = useState(MockMemeDetail)

  return (
    <>
      <h1>{memeDetail.title}</h1>
      <img alt={memeDetail.title} src={memeDetail.url} />
      <img
        alt={memeDetail.user_display_name}
        src={memeDetail.user_avatar_url}
      />
      <p>{memeDetail.user_display_name}</p>
    </>
  )
}

export default MemeDetail
