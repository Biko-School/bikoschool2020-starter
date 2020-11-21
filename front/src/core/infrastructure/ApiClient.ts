export interface ApiClient {
  get: <P>(url: string) => Promise<P>
}
