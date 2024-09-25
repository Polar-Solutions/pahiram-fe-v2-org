import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e: Error) {
    return "Oh no, something went wrong!";
  },
});
