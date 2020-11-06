import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../Meme'
import { searchMemeByText } from '../../services/getMemesData'
interface Props {
  queryString: String
}

const InputSearch: React.FC<Props> = ({ queryString }) => {
  const [queryResult, setQueryResult] = React.useState<String>('')

  return (
    <InputSearchWrapper>
      <input
        name="searchmeme"
        aria-label="searchmeme"
        placeholder="¿Qué quieres buscar? "
        onChange={(e) => setQueryResult(e.target.value)}
      ></input>
      <button onClick={(e) => searchMemeByText(queryResult)}>Buscar</button>
    </InputSearchWrapper>
  )
}

const InputSearchWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
`

export default InputSearch
