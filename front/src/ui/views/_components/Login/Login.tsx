import React from 'react'
import { User } from '../../../../domain/models/User'

interface props {
  onHandleLogin(user: User): void
}

async function login(username: string): Promise<User> {
  return new Promise((resolve, reject) =>
    resolve({
      user_name: 'valid_username',
      display_name: 'Fulanito de tal',
      logged_in: 'true',
    }),
  )
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
