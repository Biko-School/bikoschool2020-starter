import { User } from '../AuthContext'

export async function login(userName: string): Promise<User> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL as string}/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: encodeURIComponent(userName),
      }),
    },
  )

  const user: User = await response.json()
  return user
}
