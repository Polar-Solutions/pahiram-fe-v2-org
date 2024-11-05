import { actionClient } from "@/lib/safe-action";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { approveTransactionEndpoint } from "@/config/api/backend-routes/office-transaction-request";
import { ApproveTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import { IApproveTransactionApiResponse } from "@/lib/interfaces";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface ParsedInput {
  transactionId?: string;
  approvedAllItems?: boolean;
  items?: { borrowedItemId: string; isApproved: boolean }[];
}

export const approveTransactionAction = actionClient
  .schema(ApproveTransactionSchema)
  .action(
    async ({
      parsedInput: { transactionId, approvedAllItems, items },
    }: {
      parsedInput: ParsedInput;
    }) => {
      const request = async (): Promise<
        AxiosResponse<IApproveTransactionApiResponse>
      > => {
        let requestBody;

        if (approvedAllItems !== undefined) {
          // If `approvedAllItems` is provided, approve all items
          requestBody = {
            approve_all_items: approvedAllItems,
          };
        }

        // If `items` array is provided, approve/disapprove specific items
        if (items && items.length > 0) {
          requestBody = {
            items: items.map((item) => ({
              borrowed_item_id: item.borrowedItemId,
              is_approved: item.isApproved,
            })),
          };
        }

        // Send request to the backend
        return PahiramAxiosConfig.patch<IApproveTransactionApiResponse>(
          approveTransactionEndpoint(transactionId),
          requestBody
        );
      };

      return await handleApiServerSideErrorResponse({
        request,
        successMessage: "Transaction approved successfully! 🎉",
      });
    }
  );
