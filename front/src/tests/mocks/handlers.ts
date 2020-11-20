import { rest } from 'msw';
import recentMemes from './recents.json';
import apiUrl from '../../services/api-url';

export const handlers = [
  // Handles a GET /user request
  rest.get(apiUrl.recentMemes(), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recentMemes));
  }),
  // Handles a GET /user request
  rest.get(apiUrl.searchMemes('homer'), (req, res, ctx) => {
    const searchResult = {
      memes: [
        {
          id: '1',
          title: 'search-homer-title-1',
          url: 'search-homer-url-1',
        },
        {
          id: '2',
          title: 'search-homer-title-2',
          url: 'search-homer-url-2',
        },
      ],
    };
    return res(ctx.status(200), ctx.json(searchResult));
  }),
];
