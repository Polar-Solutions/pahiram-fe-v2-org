import { z } from "zod";
import {BorrowRequestSchema} from "@/lib/form-schemas/submit-borrow-request-form-schema";

export const FinalizePenaltySchema = z.object({
    borrowed_item_id: z.string(),
    penalty: z.number(),
    remarks_by_penalty_finalizer: z.string()
});

export type TFinalizePenaltySchemaFormValues = z.infer<typeof FinalizePenaltySchema>;
