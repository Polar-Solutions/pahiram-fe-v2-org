import { z } from "zod";

export const ApproveTransactionSchema = z.object({
    transactionId: z.string().optional(),
    isApproved: z.boolean()
});

export type TApproveTransactionSchema = z.infer<typeof ApproveTransactionSchema>;