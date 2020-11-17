import { setupWorker } from "msw/lib/types";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
