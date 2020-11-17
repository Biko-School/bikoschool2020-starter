import { setupServer } from "msw/lib/types/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
