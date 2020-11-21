import React from 'react'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { GeneralWrapper } from './ui/components/GeneralWrapper'
import Home from './ui/views/Home'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <GeneralWrapper>
        <Home />
      </GeneralWrapper>
    </>
  )
}

export default App
