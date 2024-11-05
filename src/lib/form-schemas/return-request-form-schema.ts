import {
  COMPLETE_BORROWED_ITEM_STATUSES,
  UNRETURNED_BORROWED_ITEM_STATUSES,
} from "@/CONSTANTS/BORROWED_ITEM_STATUS";
import { z } from "zod";

// Define the completeStatuses as a tuple type
const completeStatuses = Object.values(COMPLETE_BORROWED_ITEM_STATUSES) as [
  string,
  ...string[]
];

const unreturnedStatuses = Object.values(UNRETURNED_BORROWED_ITEM_STATUSES);

export const ReturnItemSchemaArray = z.array(
  z
    .object({
      model_name: z.string().optional(),
      item_apc_id: z.string().optional(), // Validates as UUID
      due_date: z.string().optional(),

      // For PATCH Request
      borrowed_item_id: z.string(), // Validates as UUID
      remarks_by_receiver: z
        .string()
        .min(10, "Remarks must be atleast 10 characters.")
        .max(500, "Remarks must be atmost 500 characters."), // Validates as a non-empty string
      item_status: z.enum(completeStatuses, {
        message: "Item status must be one of: " + completeStatuses.join(", "),
      }),
      penalty: z.coerce
        .number()
        .min(1, { message: "Penalty must be at least 1." })
        .max(1_000_000, { message: "Penalty must be at most 1,000,000." })
        .optional(), // Initially make penalty optional
    })
    .refine(
      (data) =>
        !unreturnedStatuses.includes(data.item_status) ||
        data.penalty !== undefined,
      {
        message: "Penalty is required for non-returned items.",
        path: ["penalty"],
      }
    )
);

// Define the schema for an array of return items
// Define the schema for an array of return items
export const ReturnItemSchema = z.object({
  transactionId: z.string().optional(),
  items: ReturnItemSchemaArray, // Ensure this is an array
});

export const ParentSchema = z.object({
  items: ReturnItemSchemaArray.optional(), // This is the array of items with a parent key
});

// Infer the types
export type TReturnItemSchemaArray = z.infer<typeof ParentSchema>;
