import {approveEndorsementAction} from "@/core/actions/approve-endorsement";
import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";
import {TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { TApproveTransactionSchema, TReleaseTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";

export const handleTransactionApproval = async (
    transactionId: string | undefined,
    executeAsync: (values: TApproveTransactionSchema) => Promise<any>,
    approvedAllItems: boolean,
) => {

    // Directly pass transaction
    console.log("THIS IS THE ID ", transactionId);
    const res = await executeAsync({transactionId, approvedAllItems});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);

}

export const handleTransactionItemApproval = async (
    transactionId: string | undefined,
    executeAsync: (values: TApproveTransactionSchema) => Promise<any>,
    borrowedItemId: string,
    isApproved: boolean,
) => {

    // Directly pass transaction
    console.log("THIS IS THE ID ", transactionId);
    const res = await executeAsync({transactionId, items: [{borrowedItemId, isApproved}]});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);
}

export const handleTransactionRelease = async (
    transactionId: string | undefined,
    executeAsync: (values: TReleaseTransactionSchema) => Promise<any>,
    releasedAllItems: boolean,
) => {

    // Directly pass transaction
    console.log("THIS IS THE ID ", transactionId);
    const res = await executeAsync({transactionId, releasedAllItems});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);

}

export const handleTransactionItemReleased = async (
    transactionId: string | undefined,
    executeAsync: (values: TReleaseTransactionSchema) => Promise<any>,
    borrowedItemId: string,
    isReleased: boolean,
) => {

    // Directly pass transaction
    console.log("THIS IS THE ID ", transactionId);
    const res = await executeAsync({transactionId, items: [{borrowedItemId, isReleased}]});

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);
}