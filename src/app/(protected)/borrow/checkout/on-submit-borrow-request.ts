import {handleApiClientSideError, IClientSideApiHandlerResponse,} from "@/core/handle-api-client-side-error";
import {TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {UseFormReturn} from "react-hook-form";

export const handleSubmitForm = async (
    form: UseFormReturn<TBorrowRequestFormValues>,
    executeAsync: (values: TBorrowRequestFormValues) => Promise<any>,
    clearCart: () => void,
) => {
    //   requestFormIsSubmitting.value = true;

    let formValues: TBorrowRequestFormValues = form.getValues();

    // Split 'endorsed_by' and update the field if needed
    const endorsedByValue = formValues.endorsed_by;
    if (endorsedByValue && endorsedByValue !== "") {
        const endorserParts = endorsedByValue.split(" + ");
        if (endorserParts.length === 2) {
            formValues = {...formValues, endorsed_by: endorserParts[1]};
        }
    } else {
        // Remove the 'endorsed_by' and 'apcis_token' fields
        const {endorsed_by, ...updatedFormValues} = formValues;
        formValues = updatedFormValues; // Assign the updated object without these fields
    }

    // Execute the action and handle the response
    const res = await executeAsync(formValues);
    const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
    };
    console.log("responsedata", responseData);

    handleApiClientSideError(responseData);

    if (res?.data?.success) {
        clearCart();
        form.reset();
    }
};
