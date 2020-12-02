import { User } from '../models/User'

export async function login(userName: string): Promise<User> {
  const response = await fetch(
    (process.env.REACT_APP_API_URL as string) +
      '/login/' +
      encodeURIComponent(userName),
  )
  const user: User = await response.json()
  return user
}
