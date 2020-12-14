import React, { useState } from 'react'
import { createContext, useContext } from 'react'

export interface User {
  user_name: string
  display_name: string
  avatar_url: string
}

interface AuthContextData {
  isUserLogged: boolean
  user: User | null
  setLoggedUser: (user: User) => void
  removeLoggedUser: () => void
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }

  return context
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const rawUser = localStorage.getItem('user')

    if (rawUser) {
      return JSON.parse(rawUser)
    }
    return null
  })

  const setLoggedUser = (user: User) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const removeLoggedUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLogged: Boolean(user),
        user,
        setLoggedUser,
        removeLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
