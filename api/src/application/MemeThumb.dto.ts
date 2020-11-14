import { Meme } from '../domain/Meme.entity';

export interface MemeThumbDTO {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

export function mapToMemeThumbDTO(meme: Meme): MemeThumbDTO {
  return {
    id: meme.id,
    title: meme.title,
    url: meme.images.small.url,
    width: meme.images.small.width,
    height: meme.images.small.height,
  };
}
