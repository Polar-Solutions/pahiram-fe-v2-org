import { z } from "zod";

export const CancelBorrowRequestSchema = z.object({
    transactionId: z.string(),
});