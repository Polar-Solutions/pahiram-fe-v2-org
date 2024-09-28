"use client";

import page from "@/app/(protected)/borrow/checkout/page";
import { getBorrowListEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { IGetSpecificTransactionApiResponse } from "@/lib/interfaces/get-specific-transaction-interface";
import { AxiosResponse } from "axios";
import { getBorrowResourceEndpoint, cancelBorrowRequestEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { handleApiServerSideErrorResponse } from "../handle-api-server-side-error-response";
import { useQuery } from "@tanstack/react-query";

export const getBorrowRequestsPagination = async (
    page: number
): Promise<IGetSpecificTransactionApiResponse> => {
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

export  const getSpecificTransaction = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionApiResponse>(
            getBorrowResourceEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
};


export const useSpecificTransaction = (transacId: string) => {
    return useQuery({
        queryKey: ["borrowRequest", transacId],
        queryFn: async () => {
            const { data } = await getSpecificTransaction(transacId);
            return data;  // Ensure you're returning the actual data from the response
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
};

export const patchCancelSpecificTransaction = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse> => {
        return PahiramAxiosConfig.patch(
            cancelBorrowRequestEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
}

export const useCancelSpecificTransaction = (transacId: string) => {
    return useQuery({
        queryKey: ["cancelBorrowRequest", transacId],
        queryFn: async () => {
            const { data } = await patchCancelSpecificTransaction(transacId);
            return data;  // Ensure you're returning the actual data from the response
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
}
