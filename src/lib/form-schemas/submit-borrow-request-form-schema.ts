import {PURPOSE_CONSTANTS_KEYS,} from "@/CONSTANTS/PURPOSE_CONSTANTS";
import {z} from "zod";

const PurposeSchema = z
    .union([
        z.enum(PURPOSE_CONSTANTS_KEYS as [string, ...string[]]),
        z.literal(""),
    ])
    .refine((purpose) => purpose !== "", {message: "Please select a purpose"});

// Base Item schema
export const ItemSchema = z.object({
    item_group_id: z.string(), // Validates as UUID
    quantity: z
        .number({invalid_type_error: "Quantity must be a number"})
        .min(1, "Quantity must be at least 1"),
    // .max(3, {message: "Max qty is 3"}),
    start_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid start date format",
        })
        .refine((date) => new Date(date) > new Date(), {
            message: "Start date should not be in the past",
        }),
    return_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid return date format",
        })
        .refine((date) => new Date(date) > new Date(), {
            message: "Return date should not be in the past",
        }),
});

// Refined schema with validation for date logic
export const SuperRefineItemSchema = ItemSchema.superRefine((data, ctx) => {
    const startDate = new Date(data.start_date);
    const returnDate = new Date(data.return_date);

    if (returnDate <= startDate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["return_date"],
            message: "Return date must be after the start date",
        });
    }
});

// Define the main schema
export const BorrowRequestSchema = z
    .object({
        endorsed_by: z.string().optional(), // `endorsed_by` is not required
        purpose: PurposeSchema, // Validates against a list of purposes
        user_defined_purpose: z
            .string()
            .min(5, "Purpose must be atleast 5 characters.")
            .max(50, "Purpose must be atmost 50 characters."), // Validates as a non-empty string
        items: z
            .array(SuperRefineItemSchema)
            .min(1, "At least one item is required"), // Validates as an array with at least one item
    })


// Define the schema for `apcis_token`
export const ApcisTokenSchema = z.object({
    apcis_token: z.string().optional(), // `apcis_token` is optional initially
});

// Combine the two schemas using `.extend()` and add the refine logic
// This is just for server action
export const BorrowRequestSchemaWithApcisToken = BorrowRequestSchema.extend(
    ApcisTokenSchema.shape
).refine(
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

// Infer the types
export type TBorrowRequestFormValues = z.infer<typeof BorrowRequestSchema>;
export type TBorrowRequestFormValuesWithApcisToken = z.infer<typeof BorrowRequestSchemaWithApcisToken>;