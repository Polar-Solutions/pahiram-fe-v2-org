import { handleApiClientSideError } from "@/core/handle-api-client-side-error";
import { extractStringValues } from "./extract-string-values-from-nested-object";

export const extractFormValidationErrorsAndTriggerToast = (errors: object) => {
  const responseData = { error: extractStringValues(errors) };

  // Call the toast handler with mapped errors
  handleApiClientSideError(responseData);
};
