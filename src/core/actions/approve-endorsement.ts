import {actionClient} from "@/lib/safe-action";
import {AxiosResponse} from "axios";
import {handleApiServerSideErrorResponse} from "@/core/handle-api-server-side-error-response";
import {PahiramAxiosConfig} from "@/config/api/BackendAxiosConfig";
import {approveEndorsementEndpoint} from "@/config/api/backend-routes/borrow-request-routes";
import {ApproveEndorsementSchema} from "@/lib/form-schemas/approve-endorsement-schema";
import {IApproveEndorsementApiResponse} from "../../lib/interfaces/approve-transaction-interface";


interface ParsedInput {
    transactionId?: string | undefined;
    isApproved: boolean;
}

export const approveEndorsementAction = actionClient
    .schema(ApproveEndorsementSchema)
    .action(
        async ({parsedInput: {transactionId, isApproved}}: { parsedInput: ParsedInput }) => {
            const request = async (): Promise<AxiosResponse<IApproveEndorsementApiResponse>> => {
                const requestBody = {
                    approval: isApproved
                }
                return PahiramAxiosConfig.patch<IApproveEndorsementApiResponse>(
                    approveEndorsementEndpoint(transactionId),
                    requestBody
                );
            };



            return await handleApiServerSideErrorResponse({
                request,
                successMessage: "Approved endorsement successfully! 🎉",
            });
        }
    );