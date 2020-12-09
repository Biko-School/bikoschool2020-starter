import { Meme } from '../domain/Meme.entity';

export interface MemeDetailDTO {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
  author: string;
  tags: Array<string>;
}

export function mapToMemeDetailDTO(meme: Meme): MemeDetailDTO {
  return {
    id: meme.id,
    title: meme.title,
    url: meme.images.original.url,
    width: meme.images.original.width,
    height: meme.images.original.height,
    author: meme.author,
    tags: meme.tags,
  };
}
