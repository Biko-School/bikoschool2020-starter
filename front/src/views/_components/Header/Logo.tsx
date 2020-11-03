import React from 'react'
import logo from './logo.png'


export const Logo: React.FC<{ className?: string }> = ({ className }) => (

    <img 
        className={className}
        src={logo}
        />

)
