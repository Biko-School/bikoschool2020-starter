import { createContext } from 'react'

export interface Auth {
  logged_in: string
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
    logged_in: 'false',
  },
}

export const AuthContext = createContext<AuthContextData>(authDefaultData)
