import { ApiClient } from '../ApiClient'
import { BusinessLogicError } from '../Error'

export class FetchRepository implements ApiClient {
  urlBase: string

  constructor() {
    this.urlBase = process.env.REACT_APP_API_URL as string
  }

  async get<P>(url: string): Promise<P> {
    const response = await fetch(this.urlBase + url)
    const jsonResponse = await response.json()
    if (!response.ok)
      throw new BusinessLogicError(
        jsonResponse.message,
        response.status.toString(),
      )
    return jsonResponse
  }
}
