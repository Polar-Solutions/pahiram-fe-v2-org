import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";
import {TApproveEndorsementSchema} from "@/lib/form-schemas/approve-endorsement-schema";

export const handleEndorsementApproval = async (
    transactionId: string | undefined,
    executeAsync: (values: TApproveEndorsementSchema) => Promise<any>,
    clearAllRequests: (grouping: "endorsement" | "transaction") => void,
    isApproved: boolean
) => {

    // Directly pass transactionId as argument
    const res = await executeAsync({transactionId, isApproved});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);

    if (responseData.success) {
        clearAllRequests("endorsement");
        window.history.back();
    }

}