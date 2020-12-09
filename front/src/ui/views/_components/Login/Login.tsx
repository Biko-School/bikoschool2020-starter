import React from 'react'
import { login } from '../../../../domain/services/login'
import { Auth } from '../../../../domain/AuthContext'

interface props {
  onHandleLogin(auth: Auth): void
}

export const Login: React.FC<props> = ({ onHandleLogin }) => {
  const [userName, setUserName] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleSubmit = () => {
    login(userName)
      .then((auth) => {
        setError('')
        if (auth.logged_in) {
          onHandleLogin(auth)
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
