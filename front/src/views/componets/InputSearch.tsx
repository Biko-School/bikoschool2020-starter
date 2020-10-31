import React from 'react'
import { Meme } from '../../Meme'

interface Props {
  queryString: String
}

const InputSearch: React.FC<Props> = ({ queryString }) => {
  return <input name="searchmeme" aria-label="searchmeme"></input>
}

export default InputSearch
