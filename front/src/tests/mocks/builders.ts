import { MemeThumb } from '../../dtos/MemeThumb';

export const aMeme = function (id: string) {
  let meme: MemeThumb = {
    id: id,
    title: 'irrelevant',
    url: 'irrelevant',
    height: 0,
    width: 0,
  };

  return {
    withTitle(title: string) {
      meme.title = title;
      return this;
    },

    withUrl(url: string) {
      meme.url = url;
      return this;
    },

    withSize(width: number, height: number) {
      meme.width = width;
      meme.height = height;
      return this;
    },

    build() {
      return meme;
    },
  };
};
