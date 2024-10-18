"use client";

import {toast} from "sonner"

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
        toast.error("Error 😭", {
            position: "top-right",
            description: "No response from the server.",
            action: {
                label: "Report",
                onClick: () => {
                },
            },
            duration: 5000,
            closeButton: true,
        });
        return;
    }

    // If there's a success field, return early since it's not an error
    if (data.success && data.isSuccessToast) {
        toast.success("YAAAAY 🥳🎉", {
            position: "top-right",
            description: data.success,
            duration: 5000,
            closeButton: true,
        });
        return;
    }

    // Ensure error is treated as an array
    const errorMessages = Array.isArray(data.error) ? data.error : [data.error];

    // Iterate through errors, but filter out undefined values
    errorMessages
        .filter((error): error is string => Boolean(error)) // Filter out undefined
        .forEach((error: string) => {
            toast.error("Error 😭", {
                position: "top-right",
                description: error || "An unknown error occurred.",
                action: {
                    label: "Report",
                    onClick: () => {
                    },
                },
                duration: 5000,
                closeButton: true,
            });
        });
};
