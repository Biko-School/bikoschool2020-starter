export interface MemeThumb {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

export interface MemeThumbList {
  memes: Array<MemeThumb>;
}
