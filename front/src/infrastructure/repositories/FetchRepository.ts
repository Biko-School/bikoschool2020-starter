import { ApiClient } from '../ApiClient'

export class FetchRepository implements ApiClient {
  urlBase: string

  constructor() {
    this.urlBase = process.env.REACT_APP_API_URL as string
  }

  async get<P>(url: string): Promise<P> {
    try {
      const response = await fetch(this.urlBase + url)
      if (!response.ok) throw Error(response.toString())
      return await response.json()
    } catch (e) {
      console.log(e)
      throw Error('Se ha producido un error')
    }
  }
}
