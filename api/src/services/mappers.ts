import { MemeThumbnail } from '../models/MemeThumbnail'
import { MemeDetails } from './../models/MemeDetails'
import { MemeDto } from './../models/MemeDto'

export function mapMemeDtoToMemeDetails(meme:MemeDto): MemeDetails {
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
  
 export const mapMemesDtoToMemesThumbnail = (memeDto: MemeDto): MemeThumbnail => ({
   id: memeDto.id,
   title: memeDto.title,
   url: memeDto.images.small.url,
   creationDate: memeDto.import_datetime,
 })