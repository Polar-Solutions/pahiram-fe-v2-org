import { actionClient } from "@/lib/safe-action";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { facilitateReturnEndpoint } from "@/config/api/backend-routes/office-transaction-request";
// import { ReturnTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import { IApproveTransactionApiResponse } from "@/lib/interfaces";
import { ReturnItemSchema } from "@/lib/form-schemas/return-request-form-schema";

interface ParsedInput {
  transactionId?: string;
  items?: {
    borrowed_item_id: string;
    item_status: string;
    remarks_by_receiver: string;
    penalty?: number;
  }[];
}

export const returnTransactionAction = actionClient
  .schema(ReturnItemSchema)
  .action(
    async ({
      parsedInput: { transactionId, items },
    }: {
      parsedInput: ParsedInput;
    }) => {
      // Build the request
      const request = async (): Promise<
        AxiosResponse<IApproveTransactionApiResponse>
      > => {
        let requestBody;

        // If `items` array is provided, include borrowed items in the request body
        if (items && items?.length > 0 && transactionId) {
          requestBody = {
            items: items.map((item) => ({
              borrowed_item_id: item?.borrowed_item_id,
              item_status: item?.item_status,
              remarks_by_receiver: item?.remarks_by_receiver,
              ...(item?.penalty && { penalty: item?.penalty }), // Adds penalty only if it has a value
            })),
          };
        } else {
          // Manually construct a response if items or transactionId is missing
          const mockResponse: AxiosResponse<IApproveTransactionApiResponse> = {
            data: {
              status: false,
              message: "Invalid fields provided",
              method: "PATCH",
            },
            status: 400, // HTTP status code
            statusText: "Bad Request", // HTTP status text
            headers: {},
            config: {
              headers: {}, // Empty headers object to satisfy the requirement
            } as InternalAxiosRequestConfig,
          };

          return mockResponse;
        }

        // Send request to the backend
        return PahiramAxiosConfig.patch<IApproveTransactionApiResponse>(
          facilitateReturnEndpoint(transactionId),
          requestBody
        );
      };

      // Handle API request and error handling
      return await handleApiServerSideErrorResponse({
        request,
        successMessage: "Item returned successfully! 🎉",
      });
    }
  );
