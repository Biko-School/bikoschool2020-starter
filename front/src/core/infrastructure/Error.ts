export class BusinessLogicError extends Error {
  statusCode: string

  constructor(message: string, statusCode: string) {
    super(message)
    this.statusCode = statusCode
  }
}
