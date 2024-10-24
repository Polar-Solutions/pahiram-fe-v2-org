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

export const ReleaseTransactionSchema = z.object({
    transactionId: z.string().optional(),
    releasedAllItems: z.boolean().optional(),
    items: z
        .array(
            z.object({
                borrowedItemId: z.string(),
                isReleased: z.boolean(),
            })
        )
        .optional(),
});


export type TReleaseTransactionSchema = z.infer<typeof ReleaseTransactionSchema>;
export type TApproveTransactionSchema = z.infer<typeof ApproveTransactionSchema>;