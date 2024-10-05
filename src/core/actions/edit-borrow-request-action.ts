import { z } from 'zod'; // Assuming Zod is used for schema validation
import { actionClient } from "@/lib/safe-action";
import { AxiosResponse } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import {
    TBorrowRequestFormValuesWithApcisToken,
} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { flattenValidationErrors } from "next-safe-action";
import { getApcisTokenFromAuthCookie } from "../data-access/cookies";
import { IBorrowRequestResponse } from "@/lib/interfaces/submit-borrow-request-interface";
import { patchBorrowRequestEndpoint } from "@/config/api/backend-routes/borrow-request-routes";

// Update ParsedInput type to include all necessary fields
interface ParsedInput {
    endorsed_by?: string;
    purpose: string;
    user_defined_purpose: string;
    items: {
        item_group_id: string;
        quantity: number;
        start_date: string;
        return_date: string;
    }[];
    transactionId: string; // transactionId is required
}

// Update the Zod schema to include transactionId
const BorrowRequestSchema = z.object({
    endorsed_by: z.string().optional(),
    purpose: z.string(),
    user_defined_purpose: z.string(),
    items: z.array(z.object({
        item_group_id: z.string(),
        quantity: z.number(),
        start_date: z.string(),
        return_date: z.string(),
    })),
    transactionId: z.string(), // Add transactionId to the schema
});

export const editBorrowRequestAction = actionClient
  .schema(BorrowRequestSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: { endorsed_by, purpose, user_defined_purpose, items, transactionId }
    }: { parsedInput: ParsedInput }) => {

      const request = async (): Promise<AxiosResponse<IBorrowRequestResponse>> => {
        let requestBody: TBorrowRequestFormValuesWithApcisToken = {
          purpose,
          user_defined_purpose,
          items,
          endorsed_by,
        };

        if (endorsed_by && endorsed_by !== "") {
          const apcis_token = await getApcisTokenFromAuthCookie();
          requestBody = { ...requestBody, apcis_token };
        }

        // Use transactionId in the patch request
        return PahiramAxiosConfig.patch<IBorrowRequestResponse>(
          patchBorrowRequestEndpoint(transactionId), // Ensure transactionId is used here
          { ...requestBody }
        );
      };

      return await handleApiServerSideErrorResponse({
        request,
        successMessage: "Submitted request successfully! 🎉",
      });
    }
  );
