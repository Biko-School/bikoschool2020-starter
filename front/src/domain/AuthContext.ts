import { createContext, useContext } from 'react'

export interface Auth {
  logged_in: boolean
  user?: {
    user_name: string
    display_name: string
    avatar_url: string
  }
}

export interface AuthContextData {
  auth: Auth
}

export const authDefaultData: AuthContextData = {
  auth: {
    logged_in: false,
  },
}

const getInitialValue = (): AuthContextData => {
  return authDefaultData
}

export const AuthContext = createContext<AuthContextData>(getInitialValue())
