import React from 'react'
import { login } from '../../../../domain/services/login'
import { User } from '../../../../domain/AuthContext'

interface props {
  onLogged(loggedUser: User): void
}

export const Login: React.FC<props> = ({ onLogged }) => {
  const [userName, setUserName] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleSubmit = () => {
    login(userName)
      .then((user) => {
        setError('')
        if (user) {
          onLogged(user)
        } else {
          setError('El usuario con el que intentas acceder no está registrado.')
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

      {error && <p>{error}</p>}
    </>
  )
}
