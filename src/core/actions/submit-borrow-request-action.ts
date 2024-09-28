import { postBorrowRequestEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import {
  BorrowRequestSchema,
  TBorrowRequestFormValues,
  TBorrowRequestFormValuesWithApcisToken,
} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { AxiosResponse } from "axios";
import { IBorrowRequestResponse } from "@/lib/interfaces/submit-borrow-request-interface";
import { getApcisTokenFromAuthCookie } from "../data-access/cookies";

export const submitBorrowRequestAction = actionClient
  .schema(BorrowRequestSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: { endorsed_by, purpose, user_defined_purpose, items },
    }) => {
      const request = async (): Promise<
        AxiosResponse<IBorrowRequestResponse>
      > => {
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

        return PahiramAxiosConfig.post<IBorrowRequestResponse>(
          postBorrowRequestEndpoint,
          { ...requestBody }
        );
      };

      return await handleApiServerSideErrorResponse({
        request,
        successMessage: "Submitted request successfully! 🎉",
      });
    }
  );
