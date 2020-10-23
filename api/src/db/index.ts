import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync('./src/db/db.json')

export const db = low(adapter)
