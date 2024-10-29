import { actionClient } from "@/lib/safe-action";
import { AxiosResponse } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { facilitateReturnEndpoint } from "@/config/api/backend-routes/office-transaction-request";
import { ReturnTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import { IApproveTransactionApiResponse } from "@/lib/interfaces";

interface ParsedInput {
    transactionId?: string;
    items?: { borrowedItemId: string; status: string; remarkByReceiver: string }[];
}

export const returnTransactionAction = actionClient
    .schema(ReturnTransactionSchema)
    .action(
        async ({ parsedInput: { transactionId, items } }: { parsedInput: ParsedInput }) => {
            // Build the request
            const request = async (): Promise<AxiosResponse<IApproveTransactionApiResponse>> => {
                let requestBody;

                // If `items` array is provided, include borrowed items in the request body
                if (items && items.length > 0) {
                    requestBody = {
                        items: items.map((item) => ({
                            borrowed_item_id: item.borrowedItemId,
                            item_status: item.status, // Now using status instead of itemStatus
                            remarks_by_receiver: item.remarkByReceiver,
                        })),
                    };
                } else {
                    throw new Error("No items to process.");
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
