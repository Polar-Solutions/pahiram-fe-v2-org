import {actionClient} from "@/lib/safe-action";
import {AxiosResponse} from "axios";
import {handleApiServerSideErrorResponse} from "@/core/handle-api-server-side-error-response";
import {PahiramAxiosConfig} from "@/config/api/BackendAxiosConfig";
import { approveTransactionEndpoint } from "@/config/api/backend-routes/office-transaction-request";
import { ApproveTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import {IApproveTransactionApiResponse} from "@/lib/interfaces";


interface ParsedInput {
    transactionId?: string | undefined;
    isApproved: boolean;
}

export const approveTransactionAction = actionClient
    .schema(ApproveTransactionSchema)
    .action(
        async ({parsedInput: {transactionId, isApproved}}: { parsedInput: ParsedInput }) => {
            const request = async (): Promise<AxiosResponse<IApproveTransactionApiResponse>> => {
                const requestBody = {
                    approval: isApproved
                }
                console.log("REQUEST BODY", requestBody);
                console.log("IDDDD", transactionId)
                return PahiramAxiosConfig.patch<IApproveTransactionApiResponse>(
                    approveTransactionEndpoint(transactionId),
                    requestBody
                );
            };



            return await handleApiServerSideErrorResponse({
                request,
                successMessage: "Approved transaction successfully! 🎉",
            });
        }
    );