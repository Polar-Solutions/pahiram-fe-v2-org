import { z } from "zod";
import {BorrowRequestSchema} from "@/lib/form-schemas/submit-borrow-request-form-schema";

export const ApproveEndorsementSchema = z.object({
    transactionId: z.string().optional(),
    isApproved: z.boolean()
});

export type TApproveEndorsementSchema = z.infer<typeof ApproveEndorsementSchema>;
