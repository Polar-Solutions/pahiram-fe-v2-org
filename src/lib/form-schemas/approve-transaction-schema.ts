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

export const ReturnTransactionSchema = z.object({
    transactionId: z.string().optional(),
    items: z
        .array(
            z.object({
                borrowedItemId: z.string(),
                status: z.string(),
                remarkByReceiver: z.string(),
            })
        )
});



export type TReturnTransactionSchema = z.infer<typeof ReturnTransactionSchema>;
export type TReleaseTransactionSchema = z.infer<typeof ReleaseTransactionSchema>;
export type TApproveTransactionSchema = z.infer<typeof ApproveTransactionSchema>;