import { Auth } from '../AuthContext'

export async function login(userName: string): Promise<Auth> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      '/login/' +
      encodeURIComponent(userName),
  )
  const auth: Auth = await response.json()
  return auth
}
