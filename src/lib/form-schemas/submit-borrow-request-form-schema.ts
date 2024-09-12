import { PURPOSE_CONSTANTS_KEYS } from "@/CONSTANTS/PURPOSE_CONSTANTS";
import { z } from "zod";

const PurposeSchema = z.enum(PURPOSE_CONSTANTS_KEYS as [string, ...string[]]);

// Define the schema for individual items in the items array
const ItemSchema = z.object({
  item_group_id: z.string(), // Validates as UUID
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(1, "Quantity must be at least 1"), // Ensures the quantity is at least 1
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date format",
  }), // Validates the date format
  return_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid return date format",
  }), // Validates the date format
});

// Define the main schema
export const BorrowRequestSchema = z
  .object({
    endorsed_by: z.string().optional(), // `endorsed_by` is not required
    apcis_token: z.string().optional(), // `apcis_token` is optional initially
    purpose: PurposeSchema, // Validates against a list of purposes
    user_defined_purpose: z.string().min(1, "User defined purpose is required"), // Validates as a non-empty string
    items: z.array(ItemSchema).min(1, "At least one item is required"), // Validates as an array with at least one item
  })
  .refine(
    (data) => {
      // Custom validation logic
      if (data.endorsed_by && !data.apcis_token) {
        return false; // `apcis_token` must be provided if `endorsed_by` exists
      }
      return true;
    },
    {
      message: "APCIS token is required when endorsed by is provided",
      path: ["apcis_token"], // Optional: can be used to specify which field to highlight on error
    }
  );
