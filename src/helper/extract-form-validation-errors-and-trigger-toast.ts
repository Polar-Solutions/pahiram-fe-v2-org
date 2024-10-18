import {handleApiClientSideError} from "@/core/handle-api-client-side-error";
import {extractStringValues} from "./extract-string-values-from-nested-object";

export const extractFormValidationErrorsAndTriggerToast = (errors: object) => {
    const responseData = extractStringValues(errors)
    // Filter out single-word items
    const finalResponseData = responseData.filter((data) => {
        // Check if the string contains more than one word
        return data.trim().split(' ').length > 1;
    });

    // Call the toast handler with mapped errors
    handleApiClientSideError({error: finalResponseData});
};
