import { z } from "zod";

export const GetOfficeTransactionSchema = z.object({
    transactionId: z.string(),
});
