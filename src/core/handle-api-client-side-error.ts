"use client";

import { toast } from "sonner"

export interface IClientSideApiHandlerResponse {
  success?: string; // Optional success message
  error?: string | string[]; // Error can be a string or an array of strings
  isSuccessToast?: boolean;
}

export const handleApiClientSideError = (
  data: IClientSideApiHandlerResponse | undefined
) => {
  // If data is undefined, return early
  if (!data) {
    toast.error( "No response from the server.", {
      position: "top-right",
      action: {
        label: "Report",
        onClick: () => {},
      }
    });
    return;
  }

  // If there's a success field, return early since it's not an error
  if (data.success && data.isSuccessToast) {
    toast.success(data.success);
    return;
  }

  // Ensure error is treated as an array
  const errorMessages = Array.isArray(data.error) ? data.error : [data.error];

  // Iterate through errors, but filter out undefined values
  errorMessages
    .filter((error): error is string => Boolean(error)) // Filter out undefined
    .forEach((error: string) => {
      toast.error(error || "An unknown error occurred", {
        position: "top-right",
        action: {
          label: "Report",
          onClick: () => {},
        }
      });
    });
};
