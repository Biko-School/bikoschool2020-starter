import React from 'react'
import { User } from '../../../../domain/models/User'
import { login } from '../../../../domain/services/login'

interface props {
  onHandleLogin(user: User): void
}

export const Login: React.FC<props> = ({ onHandleLogin }) => {
  const [userName, setUserName] = React.useState<string>('')

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleSubmit = () => {
    login(userName)
      .then((user) => {
        if (user.logged_in) {
          onHandleLogin(user)
        }
      })
      .catch((error) => {
        console.log('Login error:', error)
      })
  }

  return (
    <>
      <input
        type="text"
        aria-label="Introduce el nombre de usuario"
        onChange={changeUserName}
        value={userName}
      ></input>
      <button aria-label="Loguearse" onClick={handleSubmit}>
        Entrar
      </button>
    </>
  )
}
