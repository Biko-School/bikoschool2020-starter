import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import App from './App'
import { useEffect, useState } from 'react'
import { HttpStatus } from './services/getMemes'

interface Props {
  idMeme: string
}

export interface MemeDetail {
  id: string
  title: string
  url: string
  width: number
  height: number
  user_avatar_url: string
  user_display_name: string
  tags: string[]
}

const MemeDetail: React.FC<Props> = (props: Props) => {
  debugger
  const [memeDetail, setMemeDetail] = useState<MemeDetail>()

  React.useEffect(() => {
    getMemeDetail(props.idMeme).then(setMemeDetail)
  }, [])

  return (
    <>
      {memeDetail ? (
        <>
          <h1>{memeDetail.title}</h1>
          <img alt={memeDetail.title} src={memeDetail.url} />
          <img
            alt={memeDetail.user_display_name}
            src={memeDetail.user_avatar_url}
          />
          <p>{memeDetail.user_display_name}</p>
          {(memeDetail.tags as any[]).map((tag) => (
            <div>{tag}</div>
          ))}
        </>
      ) : null}
    </>
  )
}

export default MemeDetail

async function getMemeDetail(idMeme: string): Promise<MemeDetail> {
  const apiResponse = await fetch(
    process.env.REACT_APP_API_BASE_URL + '/meme?id=' + idMeme,
  )
  if (apiResponse.status !== HttpStatus.OK) throw new Error('Error')
  const result = await apiResponse.json()
  return result
}
