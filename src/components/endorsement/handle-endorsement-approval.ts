import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";
import {TApproveEndorsementSchema} from "@/lib/form-schemas/approve-endorsement-schema";

export const handleEndorsementApproval = async (
    transactionId: string | undefined,
    executeAsync: (values: TApproveEndorsementSchema) => Promise<any>,
    removeRequest: (grouping: "endorsement" | "transaction", transactionId: string | undefined) => void,
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

    if (responseData.success) {
        removeRequest("endorsement", transactionId);
        window.history.back();
    }

}