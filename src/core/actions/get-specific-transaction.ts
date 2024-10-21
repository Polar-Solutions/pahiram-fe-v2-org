import { actionClient } from "@/lib/safe-action";
import { AxiosResponse } from "axios";
import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { specificTransactionEndpoint } from "@/config/api/backend-routes/office-transaction-request";
import { GetOfficeTransactionSchema } from "@/lib/form-schemas/get-specific-transaction-schema";


interface ParsedInput {
    transactionId: string;
}

export const getOfficeTransactionAction = actionClient
    .schema(GetOfficeTransactionSchema)
    .action(
        async ({ parsedInput: { transactionId } }: { parsedInput: ParsedInput }) => {
            const request = async (): Promise<AxiosResponse> => {
                return PahiramAxiosConfig.get(specificTransactionEndpoint(transactionId));
            };

            return await handleApiServerSideErrorResponse({
                request,
                successMessage: "Transaction fetch successfully! 🎉",
            });
        }
    );