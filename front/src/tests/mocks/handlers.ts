import { rest } from 'msw';
import recentMemes from './recents.json';
import { aMeme, aMemeDetail } from './builders';

export const handlers = [
  rest.get(process.env.REACT_APP_DEV_API + '/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recentMemes));
  }),

  rest.get(process.env.REACT_APP_DEV_API + '/search/homer', (req, res, ctx) => {
    const searchResult = {
      memes: [
        aMeme('1')
          .withTitle('search-homer-title-1')
          .withUrl('search-homer-url-1')
          .build(),
        aMeme('2')
          .withTitle('search-homer-title-2')
          .withUrl('search-homer-url-2')
          .build(),
      ],
    };
    return res(ctx.status(200), ctx.json(searchResult));
  }),

  rest.get(process.env.REACT_APP_DEV_API + '/search/empty', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ memes: [] }));
  }),

  rest.get(process.env.REACT_APP_DEV_API + '/meme/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        aMemeDetail('1')
          .withTitle('meme-detail-title-1')
          .withTags(['meme-detail-tag-1a', 'meme-detail-tag-1b'])
          .build(),
      ),
    );
  }),

  rest.get(
    process.env.REACT_APP_DEV_API + '/meme/YleuWir5NTNVXkflSp',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(aMemeDetail('YleuWir5NTNVXkflSp').build()),
      );
    },
  ),
];
