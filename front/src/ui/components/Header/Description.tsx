import styled from 'styled-components/macro'
import React from 'react'
import { fonts } from '../../theme/theme'
import trendingLogo from '../../../assets/Arrow 1.png'
const Description: React.FC = () => {
  return (
    <DescriptionWrapper>
      <DescriptionText>
        <TrendingImg src={trendingLogo}></TrendingImg>Los guif más trendings del
        momento
      </DescriptionText>
    </DescriptionWrapper>
  )
}

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 62px;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const TrendingImg = styled.img`
  margin-right: 1rem;
`
const DescriptionText = styled.p`
  ${fonts.textDescription}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 615px;
  height: 62px;
  margin-top: 47px;
`

export default Description
