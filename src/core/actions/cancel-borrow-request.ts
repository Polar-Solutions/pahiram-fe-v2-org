import { actionClient } from "@/lib/safe-action";
import { AxiosResponse } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { cancelBorrowRequestEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { CancelBorrowRequestSchema } from "@/lib/form-schemas/cancel-borrow-request-schema";


interface ParsedInput {
    transactionId: string;
}

export const cancelBorrowRequestAction = actionClient
    .schema(CancelBorrowRequestSchema)
    .action(
        async ({ parsedInput: { transactionId } }: { parsedInput: ParsedInput }) => {
            const request = async (): Promise<AxiosResponse> => {
                return PahiramAxiosConfig.patch(cancelBorrowRequestEndpoint(transactionId));
            };

            return await handleApiServerSideErrorResponse({
                request,
                successMessage: "Cancelled request successfully! 🎉",
            });
        }
    );