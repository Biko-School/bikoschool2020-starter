import React from 'react'
import { useParams } from 'react-router-dom'
import { Meme } from '../../core/domain/meme/Meme'
import { getMemeDetail } from '../../core/services/meme/getMemesService'

export const MemeDetail: React.FC = () => {
  interface ParamTypes {
    id: string
  }

  const [meme, setMeme] = React.useState<Meme[]>()
  const { id } = useParams<ParamTypes>()
  React.useEffect(() => {
    getMemeDetail(id)
      .then((meme) => {
        setMeme(meme)
      })
      .catch((error) => console.log('Error:', error))
  }, [id])
  return (
    <>
      {meme ? (
        <>
          <p>{meme[0].title}</p>
        </>
      ) : null}
    </>
  )
}
