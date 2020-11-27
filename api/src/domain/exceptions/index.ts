export class MemeDoesNotExistException extends Error {
  constructor(id: string){
    super(`Meme doesn't exist with ID: ${id}`)
  }
}

export class InvalidSearchTermException extends Error {
  constructor(searchTerm: string, reason?: string){
    super(`${searchTerm} isn´t a valid search term ${reason && `(${reason})`}`)
  }
}