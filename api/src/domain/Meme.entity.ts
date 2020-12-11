export interface MemeImg {
  width: number;
  height: number;
  url: string;
}

export interface Meme {
  id: string;
  title: string;
  datetime: string;
  images: {
    original: MemeImg;
    small: MemeImg;
  };
  author: string;
  tags: Array<string>;
}
