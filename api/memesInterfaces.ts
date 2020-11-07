export interface MemeThumb {
  id: string;
  title: string;
  url: string;
}

export interface MemeThumbList {
  memes: Array<MemeThumb>;
}
