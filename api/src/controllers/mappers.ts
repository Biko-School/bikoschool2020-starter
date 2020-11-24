import { MemeThumbnail } from '../models/MemeThumbnail'
import { MemeDetails } from './../models/MemeDetails'
import { MemeDatabase} from './../models/DatabaseSchema'

export function mapMemeDatabaseToMemeDetails(meme:MemeDatabase): MemeDetails {
    return {
      id: meme.id,
      title: meme.title,
      url: meme.images.original.url,
      tags: meme.tags,
      author: meme.user ? {
        displayName: meme.user.display_name,
        avatarUrl: meme.user.avatar_url
      }: undefined
    }
  }
  
 export  function mapMemesDatabaseToMemes(memesDatabase: MemeDatabase[]): MemeThumbnail[] {
    return memesDatabase.map((meme) => ({
      id: meme.id,
      title: meme.title,
      url: meme.images.small.url,
      creationDate: meme.import_datetime,
    }))
  }
  