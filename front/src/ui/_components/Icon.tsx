import React from 'react'
import { IconContext } from 'react-icons'

interface Props {
  className?: string
}

export const Icon: React.FC<Props> = ({ className, children }) => {
  return (
    <IconContext.Provider value={{ className: className }}>
      {children}
    </IconContext.Provider>
  )
}
