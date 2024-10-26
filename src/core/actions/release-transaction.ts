import { actionClient } from "@/lib/safe-action";
import { AxiosResponse } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { releaseTransactionEndpoint } from "@/config/api/backend-routes/office-transaction-request";
import { ReleaseTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import { IApproveTransactionApiResponse } from "@/lib/interfaces";

interface ParsedInput {
    transactionId?: string;
    releasedAllItems?: boolean;
    items?: { borrowedItemId: string; isReleased: boolean }[];
}

export const releaseTransactionAction = actionClient
    .schema(ReleaseTransactionSchema)
    .action(
        async ({ parsedInput: { transactionId, releasedAllItems, items } }: { parsedInput: ParsedInput }) => {
            const request = async (): Promise<AxiosResponse<IApproveTransactionApiResponse>> => {
                let requestBody;

                // If `approvedAllItems` is provided, approve all items
                if (releasedAllItems !== undefined) {
                    requestBody = {
                        release_all_items: releasedAllItems,
                    };
                }

                // If `items` array is provided, approve/disapprove specific items
                if (items && items.length > 0) {
                    requestBody = {
                        items: items.map((item) => ({
                            borrowed_item_id: item.borrowedItemId,
                            is_released: item.isReleased,
                        })),
                    };
                }

                // Send request to the backend
                return PahiramAxiosConfig.patch<IApproveTransactionApiResponse>(
                    releaseTransactionEndpoint(transactionId),
                    requestBody
                );
            };

            return await handleApiServerSideErrorResponse({
                request,
                successMessage: "Transaction released successfully! 🎉",
            });
        }
    );


    
