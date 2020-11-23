import { DatabaseSchema, MemeSchema } from 'DatabaseSchema'
import Lowdb from 'lowdb'
import { Meme } from 'Domain/models/Meme'
import { MemeRepository } from './MemeRepository'
import { MemeDetail } from 'Domain/models/MemeDetail'

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

  searchMemes(filter: string): Meme[] {
    const filteredMemes: MemeSchema[] = this.db
      .get('memes')
      .filter((meme) =>
        meme.tags.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase()),
        ),
      )
      .sortBy('import_datetime')
      .reverse()
      .value()

    return filteredMemes.map((meme) => this.map(meme))
  }

  getMemeDetail(id: string): MemeDetail {
    const meme: MemeSchema = this.db
      .get('memes')
      .find((meme) => meme.id === id)
      .value()

    return this.mapDetail(meme)
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

  private mapDetail(entity: MemeSchema): MemeDetail {
    return {
      id: entity.id,
      title: entity.title,
      image: {
        width: entity.images.original.width,
        height: entity.images.original.height,
        url: entity.images.original.url,
      },
      tags: [...entity.tags],
      ...(entity.user && {
        user: {
          name: entity.user.display_name,
          avatar_url: entity.user.avatar_url,
        },
      }),
    }
  }
}
