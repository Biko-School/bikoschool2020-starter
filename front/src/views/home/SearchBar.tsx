import React from 'react';
import styled from 'styled-components';
import { size, color, font } from '../../styles/theme';
import { rem } from 'polished';
import { Lupa } from '../components/Lupa';

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: ${size.medium};
`;

const SearchInput = styled.input`
  height: ${rem(70)};
  padding-left: ${size.base};
  padding-right: ${size.base};
  flex-grow: 1;
  border: none;
  ${font.h4()}
  line-height: ${rem(70)};
  &::placeholder {
    color: ${color.grey};
    ${font.h4()};
    line-height: ${rem(70)};
  }
`;

const SearchSubmitButton = styled.a`
  display: flex;
  width: ${rem(70)};
  height: ${rem(70)};
  margin: 0;
  padding: 0;
  border: none;
  background: linear-gradient(
      135deg,
      rgba(255, 243, 92, 0.77) 0%,
      rgba(0, 204, 255, 0.46) 51.04%,
      rgba(0, 255, 153, 0.37) 100%
    ),
    linear-gradient(0deg, #c4c4c4, #c4c4c4);
`;

const LupaIcon = styled(Lupa)`
  display: flex;
  position: relative;
  margin: 13px auto;
  justify-content: center;
  align-items: center;
`;

const ErrMessageWrapper = styled.p`
  position: absolute;
  right: ${rem(80)};
  height: ${rem(50)};
  line-height: ${rem(50)};
  margin-top: ${rem(10)};
  padding: ${size.tiny};
  padding-top: ${rem(10)};
  border: 1px solid ${color.lightRed};
  color: ${color.white};
  background-color: ${color.purple};
  ${font.h4()};
`;

export const SearchBar = function (props: { onSearchRequested: Function }) {
  let inputValue = '';
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const validateSearch = function () {
    if (inputValue.length >= 3 || inputValue.length === 0) {
      setErrorMsg('');
      props.onSearchRequested(inputValue);
    } else {
      setErrorMsg('La búsqueda no puede contener menos de 3 caracteres');
    }
  };

  let errorMsgElem = null;
  if (errorMsg !== '')
    errorMsgElem = <ErrMessageWrapper>{errorMsg}</ErrMessageWrapper>;

  return (
    <SearchBarWrapper>
      <SearchInput
        id="search-bar"
        onChange={(ev) => {
          inputValue = ev.target.value;
        }}
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            validateSearch();
          }
        }}
        placeholder="¿Qué quieres buscar? ¡Encuéntralo!"
      ></SearchInput>
      <SearchSubmitButton
        href="#"
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          validateSearch();
        }}
      >
        <LupaIcon title="Buscar" />
      </SearchSubmitButton>
      {errorMsgElem}
    </SearchBarWrapper>
  );
};
