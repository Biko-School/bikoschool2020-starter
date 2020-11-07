export interface MemeThumb {
  id: string;
  title: string;
  url: string;
}

export interface RecentMemesData {
  memes: Array<MemeThumb>;
  error: false | string;
}
