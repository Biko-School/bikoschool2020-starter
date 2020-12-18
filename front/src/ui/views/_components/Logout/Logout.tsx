import React from 'react'
import { User } from '../../../../domain/AuthContext'

interface props {
  onLogout(): void
  loggedUser: User
}

export const Logout: React.FC<props> = ({
  loggedUser,
  onLogout: onHandleLogout,
}) => {
  return (
    <>
      <img src={loggedUser.avatar_url} alt={loggedUser.user_name} />
      <span>{loggedUser.display_name}</span>
      <button aria-label="Desloguearse" onClick={onHandleLogout}>
        Desloguearse
      </button>
    </>
  )
}
