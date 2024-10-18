import {approveEndorsementAction} from "@/core/actions/approve-endorsement";
import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";
import {TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {TApproveEndorsementSchema} from "@/lib/form-schemas/approve-endorsement-schema";

export const handleEndorsementApproval = async (
    transactionId: string | undefined,
    executeAsync: (values: TApproveEndorsementSchema) => Promise<any>,
    isApproved: boolean
) => {

    // Directly pass transactionId as argument
    console.log("THIS IS THE ID ", transactionId);
    const res = await executeAsync({transactionId, isApproved});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);

}