import { MemeRepository } from './MemeRepository'
import Lowdb from 'lowdb'
import { DatabaseSchema, MemeDB } from 'DatabaseSchema'
import { Meme } from 'core/domain/meme/Meme'

export class LowDbMemeRepository implements MemeRepository {
  db: Lowdb.LowdbSync<DatabaseSchema>

  constructor(db: Lowdb.LowdbSync<DatabaseSchema>) {
    this.db = db
  }

  async getAll(): Promise<Meme[]> {
    const memes = await this.db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(50)
      .value()
    return this.formatMemes(memes)
  }

  async getAllByTag(query: string): Promise<Meme[]> {
    const memes = await this.db
      .get('memes')
      .sortBy('import_datetime')
      .filter((meme) =>
        meme.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        ),
      )
      .reverse()
      .value()
    return this.formatMemes(memes)
  }

  private formatMemes(memes: MemeDB[]): Meme[] {
    let mappedMemes: Array<Meme> = []
    for (let meme of memes) {
      mappedMemes.push(this.map(meme))
    }
    return mappedMemes
  }

  private map(entity: MemeDB): Meme {
    return {
      id: entity.id,
      title: entity.title,
      image: {
        width: entity.images.small.width,
        height: entity.images.small.height,
        url: entity.images.small.url,
      },
      date: entity.import_datetime,
      tags: entity.tags,
      user: entity.user,
    }
  }
}
