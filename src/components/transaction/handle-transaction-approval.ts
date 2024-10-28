import {approveEndorsementAction} from "@/core/actions/approve-endorsement";
import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";
import {TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { TApproveTransactionSchema, TReleaseTransactionSchema, TReturnTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";

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
    approvalItems: Array<{ borrowedItemId: string; isApproved: boolean }> // Expecting an array of approval items
) => {
    console.log("THIS IS THE ID ", transactionId);
    console.log("THIS ARE THE ITEMS ", approvalItems); // Log the items to see what's being passed

    // Pass the transaction ID along with an array of items for approval
    const res = await executeAsync({ transactionId, items: approvalItems });

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);
};


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
    releasedItems: Array<{ borrowedItemId: string; isReleased: boolean }> // Expecting an array of released items
) => {

    // Directly pass transaction
    console.log("THIS IS THE ID ", transactionId);
    console.log("THIS ARE THE ITEMS ", releasedItems); // Log the items to see what's being passed

    const res = await executeAsync({ transactionId, items: releasedItems });

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);
}

export const handleTransactionReturn = async (
    transactionId: string | undefined,
    executeAsync : (values: TReturnTransactionSchema) => Promise<any>,
    returnItems: Array<{ borrowedItemId: string; status: string; remarkByReceiver: string }> // Expecting an array of returned items
) => {

    console.log("THIS IS THE ID ", transactionId);
    console.log("THIS ARE THE ITEMS ", returnItems); // Log the items to see what's being passed

    const res = await executeAsync({ transactionId, items: returnItems });

    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };

    handleApiClientSideError(responseData);
    
}