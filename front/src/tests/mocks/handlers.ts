import { rest } from 'msw';
import recentMemes from './recents.json';

export const handlers = [
  // Handles a GET /user request
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recentMemes));
  }),
];
