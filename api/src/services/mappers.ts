import { MemeThumbnail } from '../domain/models/MemeThumbnail'
import { MemeDetails } from '../domain/models/MemeDetails'
import { MemeSchema } from '../domain/models/MemeSchema'

export function mapMemeSchemaToMemeDetails(meme: MemeSchema): MemeDetails {
  return {
    id: meme.id,
    title: meme.title,
    url: meme.images.original.url,
    tags: meme.tags,
    author: meme.user
      ? {
          displayName: meme.user.display_name,
          avatarUrl: meme.user.avatar_url,
        }
      : undefined,
  }
}

export const mapMemesSchemaToMemesThumbnail = (
  memeSchema: MemeSchema,
): MemeThumbnail => ({
  id: memeSchema.id,
  title: memeSchema.title,
  url: memeSchema.images.small.url,
  creationDate: memeSchema.import_datetime,
})
