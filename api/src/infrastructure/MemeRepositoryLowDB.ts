import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import Lowdb from 'lowdb'
import { Meme } from 'Meme'
import { MemeRepository } from './MemeRepository'

export class MemeRepositoryLowDB implements MemeRepository {
  private db: Lowdb.LowdbSync<DatabaseSchema>

  constructor(db: Lowdb.LowdbSync<DatabaseSchema>) {
    this.db = db
  }

  getTrendingMemes(): Meme[] {
    const mostRecentMemes: MemeSchema[] = this.db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(50)
      .value()

    return mostRecentMemes.map((meme) => this.map(meme))
  }

  private map(entity: MemeSchema): Meme {
    return {
      id: entity.id,
      title: entity.title,
      image: {
        width: entity.images.small.width,
        height: entity.images.small.height,
        url: entity.images.small.url,
      },
      date: entity.import_datetime,
      tags: [...entity.tags],
    }
  }
}
