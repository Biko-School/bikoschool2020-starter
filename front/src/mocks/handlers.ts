import { rest } from "msw/lib/types";
import memes from "../test.json";

export const handlers = [
  rest.get("/api/memes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(memes));
  }),
];
