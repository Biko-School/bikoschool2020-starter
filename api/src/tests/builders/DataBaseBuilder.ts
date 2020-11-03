import { DatabaseSchema } from 'schemas/DatabaseSchema'
import { MemeDb } from 'schemas/MemeDb'

export const aDbSchema = function () {
  const dbSchema: DatabaseSchema = {
    memes: [],
  }

  return {
    withMemes(memes: Array<MemeDb>) {
      dbSchema.memes = memes
      return this
    },

    build() {
      return dbSchema
    },
  }
}
