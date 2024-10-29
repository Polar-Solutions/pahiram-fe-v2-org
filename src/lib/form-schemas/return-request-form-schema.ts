import { RETURNED_STATUSES } from "@/CONSTANTS/BORROW_ITEM_STATUSES_CONSTANT";
import { z } from "zod";

export const SingleReturnItemSchema = z.object({
  borrowed_item_id: z.string(), // Validates as UUID
  item_apc_id: z.string(), // Validates as UUID
  remarks_by_receiver: z
    .string()
    .min(10, "Remarks must be atleast 10 characters.")
    .max(500, "Remarks must be atmost 500 characters."), // Validates as a non-empty string
  item_status: z.enum(RETURNED_STATUSES, {
    message: "Item status must be one of: " + RETURNED_STATUSES.join(", "),
  }),
  penalty: z
    .number()
    .min(1, { message: "Penalty must be at least 1." })
    .max(1_000_000, { message: "Penalty must be at most 1,000,000." }), // Restrict to range 1–1,000,000
});

// Define the schema for an array of return items
// Define the schema for an array of return items
export const ReturnItemSchema = z.object({
  items: z.array(SingleReturnItemSchema), // Ensure this is an array
});

// Infer the types
export type TReturnItemFormValues = z.infer<typeof ReturnItemSchema>;
