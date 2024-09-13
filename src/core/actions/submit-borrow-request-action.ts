import { postBorrowRequestEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { handleApiServerSideErrorResponse } from "@/helper/handle-api-server-side-error-response";
import { BorrowRequestSchema } from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { getApcisTokenFromAuthCookie } from "../data-access/cookies";

export const submitBorrowRequestAction = actionClient
  .schema(BorrowRequestSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: {
        endorsed_by,
        apcis_token,
        purpose,
        user_defined_purpose,
        items,
      },
    }) => {
      const method = () =>
        PahiramAxiosConfig.post(postBorrowRequestEndpoint, {
          endorsed_by,
          apcis_token,
          purpose,
          user_defined_purpose,
          items,
        });

      return await handleApiServerSideErrorResponse({
        method,
        successMessage: "Submitted request successfully! 🎉",
      });
    }
  );
