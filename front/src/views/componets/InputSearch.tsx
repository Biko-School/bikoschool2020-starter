import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../Meme'
import { searchMemeByText } from '../../services/getMemesData'
import logoLupa from '../../assets/Lupa.png'

interface Props {
  queryString: String
}

const InputSearch: React.FC<Props> = ({ queryString }) => {
  const [queryResult, setQueryResult] = React.useState<String>('')

  return (
    <InputSearchWrapper>
      <Input
        name="searchmeme"
        aria-label="searchmeme"
        placeholder="¿Qué quieres buscar? ¡Búscalo!"
        onChange={(e) => setQueryResult(e.target.value)}
      ></Input>
      <Button onClick={(e) => searchMemeByText(queryResult)}>
        <Lupa src={logoLupa} />
      </Button>
    </InputSearchWrapper>
  )
}

const InputSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: stretch;
  width: 100%;
  height: 4rem;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Input = styled.input`
  //width: 90%;
  flex-grow: 2;
  display: flex;
  padding: 24px 16px 24px 16px;
  border: 0;
`

const Button = styled.button`
  //width: 10%;
  text-align: center;
  height: 100%;
  padding: 16px;
  cursor: pointer;
  background: linear-gradient(
      135deg,
      rgba(255, 243, 92, 0.77) 0%,
      rgba(0, 204, 255, 0.46) 51.04%,
      rgba(0, 255, 153, 0.37) 100%
    ),
    linear-gradient(0deg, #c4c4c4, #c4c4c4);
  border: 0;
`

const Lupa = styled.img`
  width: 1.5rem;
  mix-blend-mode: normal;
  :-webkit-input-placeholder,
  :-moz-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder {
    padding-left: 10px;
  }
`

export default InputSearch
