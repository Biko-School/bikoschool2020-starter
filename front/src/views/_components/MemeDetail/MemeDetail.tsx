import React from 'react'
import { useEffect, useState } from 'react'
import { getMemeDetail } from '../../../services/getMemeDetail'
import { MemeDetailTag } from './MemeDetail.styles'

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
  // debugger
  const [memeDetail, setMemeDetail] = useState<MemeDetail>()

  useEffect(() => {
    getMemeDetail(props.idMeme).then(setMemeDetail)
  }, [props.idMeme])

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
            <MemeDetailTag key={tag}>{tag}</MemeDetailTag>
          ))}
        </>
      ) : null}
    </>
  )
}

export default MemeDetail
