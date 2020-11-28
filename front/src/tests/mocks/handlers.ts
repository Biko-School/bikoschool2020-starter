import { rest } from 'msw';
import recentMemes from './recents.json';
import { aMeme } from './builders';

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
      ctx.json({
        id: '1',
        title: 'Best friends dog GIF',
        url:
          'https://media4.giphy.com/media/XEbIyyo02CsFyDmFXL/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif',
        width: 200,
        height: 300,
        author: 'GifMaster',
        tags: ['Dog', 'Cute'],
      }),
    );
  }),
];
