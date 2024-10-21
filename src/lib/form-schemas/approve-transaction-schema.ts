import { z } from "zod";

export const ApproveTransactionSchema = z.object({
    transactionId: z.string().optional(),
    approvedAllItems: z.boolean().optional(),
    items: z
        .array(
            z.object({
                borrowedItemId: z.string(),
                isApproved: z.boolean(),
            })
        )
        .optional(),
});

export type TApproveTransactionSchema = z.infer<typeof ApproveTransactionSchema>;