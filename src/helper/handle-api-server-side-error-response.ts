import axios, { AxiosResponse } from "axios";
import { extractStringValues } from "./extract-string-values-from-object";

interface HandleApiServerSideErrorResponse {
  method: () => Promise<AxiosResponse>; // The method should be an async function that returns a promise
  successMessage?: string; // Optional success message to be used when the operation succeeds
}

export const handleApiServerSideErrorResponse = async ({
  method,
  successMessage = "Operation successful! 🎉",
}: HandleApiServerSideErrorResponse) => {
  try {
    // Check if the response status is exactly 200
    const response = await method();
    if (response.status === 200) {
      return { success: successMessage };
    }

    // Handle other 2xx
    return { error: "Unexpected status code received." };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // The request was made and the server responded with a status code
      if (error.response) {
        // Handle 422 Error code
        if (error.response.status === 422) {
          if (error.response?.data?.errors) {
            const extractedStrings = extractStringValues(
              error.response.data.errors
            );
            return { error: extractedStrings };
          }
        }

        // Check for unauthorized access
        if (error.response.status === 401) {
          return {
            error:
              error.response?.data?.message || "Warning! Unauthorized access.",
          };
        }

        // Handle other specific errors that are not 500 or 404
        if (![500, 404].includes(error.response.status)) {
          return { error: "Something went wrong. Try again later." };
        }

        // Handle server errors and not found errors
        if (error.response.status === 500) {
          return { error: "Internal server error. Please try again later." };
        }
        if (error.response.status === 404) {
          return { error: "Resource not found. Please check the URL or data." };
        }

        // Fallback for other error with HTTP Status
        return {
          error:
            error.response.data?.message ||
            "Failed to process request. Try again later.",
        };
      } else if (error.request) {
        // The request was made but no response was received
        return { error: "Unexpected server response. Try again later." };
      } else {
        // Fallback for other errors
        return { error: "An unexpected error occurred." };
      }
    }

    // Handle cases where the error is not an Axios error
    return { error: "An unexpected error occurred." };
  }
};
