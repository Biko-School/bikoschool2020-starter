import { DatabaseSchema } from 'core/infrastructure/model/DatabaseSchema'
import { MemeDb } from 'core/infrastructure/model/MemeDb'

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
