import {z} from "zod";

export const PenalizeItemSchemaArray = z.array(
    z.object({
        model_name: z.string(),
        item_apc_id: z.string(), // Validates as UUID

        // For PATCH Request
        borrowed_item_id: z.string(),
        remarks_by_penalty_finalizer: z
            .string()
            .min(10, "Remarks must be atleast 10 characters.")
            .max(500, "Remarks must be atmost 500 characters."),
        penalty: z
            .number()
            .min(1, {message: "Penalty must be at least 1."})
            .max(1_000_000, {message: "Penalty must be at most 1,000,000."}), // Restrict to range 1–1,000,000
    })
);

export const FinalizePenaltySchema = z.object({
    items: PenalizeItemSchemaArray, // Ensure this is an array
});

export type TFinalizePenaltySchemaFormValues = z.infer<typeof FinalizePenaltySchema>;
export type TFinalizePenaltyItemSchemaArray = z.infer<typeof PenalizeItemSchemaArray>;

