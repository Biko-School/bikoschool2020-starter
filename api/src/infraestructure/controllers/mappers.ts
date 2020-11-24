import { MemeThumbnail } from '../../models/MemeThumbnail'
import { MemeDetails } from '../../models/MemeDetails'
import { MemeDto } from '../../models/MemeDto'

export function mapMemeDatabaseToMemeDetails(meme:MemeDto): MemeDetails {
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
  
 export  function mapMemesDatabaseToMemes(memesDatabase: MemeDto[]): MemeThumbnail[] {
    return memesDatabase.map((meme) => ({
      id: meme.id,
      title: meme.title,
      url: meme.images.small.url,
      creationDate: meme.import_datetime,
    }))
  }
  