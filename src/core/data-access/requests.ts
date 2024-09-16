'use client';

import page from "@/app/(protected)/borrow/checkout/page";
import { getBorrowListEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { IGetBorrowRequestApiResponse } from "@/lib/interfaces";

export const getBorrowRequestsPagination = async (
    page: number
): Promise<IGetBorrowRequestApiResponse> => {
    try {
        const response = await PahiramAxiosConfig.get(
            getBorrowListEndpoint(page)
        );
    
        if (!response.status || response.status >= 400) {
            const errorBody = await response.statusText;
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
        }
        return await response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error("Failed to fetch items: Unknown error");
        }
    }
}