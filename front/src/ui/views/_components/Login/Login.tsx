import React from 'react'
import { User } from '../../../../domain/models/User'
import { login } from '../../../../domain/services/login'

interface props {
  onHandleLogin(user: User): void
}

export const Login: React.FC<props> = ({ onHandleLogin }) => {
  const [userName, setUserName] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleSubmit = () => {
    login(userName)
      .then((user) => {
        setError('')
        if (user.logged_in === 'true') {
          onHandleLogin(user)
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
