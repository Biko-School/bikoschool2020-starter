import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  justify-content: flex-end;
  padding: '0.5rem';
  width: 50%;
`;

export const SearchBar = function () {
  return <SearchInput></SearchInput>;
};
