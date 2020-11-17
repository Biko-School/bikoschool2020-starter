import React from 'react'
import { BsSearch, BsGraphUp } from 'react-icons/bs'

interface IconProps {
  size?: string
  color?: string
}
export const Search: React.FC<IconProps> = (props) => <BsSearch {...props} />
export const Trending: React.FC<IconProps> = (props) => <BsGraphUp {...props} />
