"use client";

import {
    cancelBorrowRequestEndpoint,
    getBorrowListEndpoint,
    getBorrowResourceEndpoint,
    getEndorsementResourceEndpoint
} from "@/config/api/backend-routes/borrow-request-routes";
import {PahiramAxiosConfig} from "@/config/api/BackendAxiosConfig";
import {
    IBaseApiResponse,
    IGetSpecificTransactionApiResponse, IGetSpecificTransactionItemsApiResponse, IItemGroup
} from "@/lib/interfaces/get-specific-transaction-interface";
import {AxiosResponse} from "axios";
import {handleApiServerSideErrorResponse} from "../handle-api-server-side-error-response";
import {useQuery} from "@tanstack/react-query";
import {IGetBorrowRequestApiResponse} from "@/lib/interfaces";
import {IGetTransactionRequestApiResponse} from "@/lib/interfaces/get-office-transaction-interface";
import {
    getOfficeTransactionListEndpoint,
    getPenalizedTransactionListEndpoint, specificPenalizedTransactionItemsEndpoint,
    specificTransactionEndpoint,
    specificTransactionItemsEndpoint
} from "@/config/api/backend-routes/office-transaction-request";
import {getEndorsementTransactionListEndpoint} from "@/config/api/backend-routes/endorsement-transaction-request";

export const getBorrowRequestsPagination = async (
    page: number
): Promise<IGetBorrowRequestApiResponse> => {  // Use the correct interface
    try {
        const response = await PahiramAxiosConfig.get(getBorrowListEndpoint(page));

        if (!response.status || response.status >= 400) {
            const errorBody = response.statusText;
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
        }

        return response.data;  // This should match IGetBorrowRequestApiResponse structure
    } catch (error) {
        console.error("Error fetching items:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error("Failed to fetch items: Unknown error");
        }
    }
}


export const getSpecificTransaction = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionApiResponse>(
            getBorrowResourceEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
};

export const getSpecificEndorsementTransaction = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionApiResponse>(
            getEndorsementResourceEndpoint(transacId)
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
            const {data} = await getSpecificTransaction(transacId);
            return data;  // Ensure you're returning the actual data from the response
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
};

export const useSpecificEndorsementTransaction = (transacId: string) => {
    return useQuery({
        queryKey: ["endorsementRequest", transacId],
        queryFn: async () => {
            const {data} = await getSpecificEndorsementTransaction(transacId);
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
            const {data} = await patchCancelSpecificTransaction(transacId);
            return data;  // Ensure you're returning the actual data from the response
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
}


export const getTransactionRequestPagination = async (
    page: number,
    forceRefetch = false // Add a forceRefetch parameter
): Promise<IGetTransactionRequestApiResponse> => { // Use the correct interface
    try {
        // If forceRefetch is true, directly fetch the data without checking the cache
        const response = await PahiramAxiosConfig.get(getOfficeTransactionListEndpoint(page));

        if (!response.status || response.status >= 400) {
            const errorBody = response.statusText;
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
        }

        return response.data; // This should match IGetBorrowRequestApiResponse structure
    } catch (error) {
        console.error("Error fetching items:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error("Failed to fetch items: Unknown error");
        }
    }
};


export const getEndorsementTransactionPagination = async (
    page: number
): Promise<IGetTransactionRequestApiResponse> => {  // Use the correct interface
    try {
        const response = await PahiramAxiosConfig.get(getEndorsementTransactionListEndpoint(page));

        if (!response.status || response.status >= 400) {
            const errorBody = response.statusText;
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
        }

        return response.data;  // This should match IGetBorrowRequestApiResponse structure
    } catch (error) {
        console.error("Error fetching items:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error("Failed to fetch items: Unknown error");
        }
    }
}

export const getSpecificOfficeTransaction = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionApiResponse>(
            specificTransactionEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
};


export const getSpecificTransactionItems = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionItemsApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionItemsApiResponse>(
            specificTransactionItemsEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
};


export const useSpecificOfficeTransaction = (transacId: string) => {
    return useQuery({
        queryKey: ["officeTransaction", transacId],
        queryFn: async () => {
            const {data} = await getSpecificOfficeTransaction(transacId);
            return data;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
};

export const useSpecificTransactionItems = (transacId: string) => {
    return useQuery({
        queryKey: ["officeTransaction", transacId],
        queryFn: async () => {
            const {data} = await getSpecificTransactionItems(transacId);
            return data;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
};

export const getPenalizedTransactionRequestPagination = async (page: number) => {
    const request = async (): Promise<AxiosResponse<IBaseApiResponse<IItemGroup[]>>> => {
        return PahiramAxiosConfig.get<IBaseApiResponse<IItemGroup[]>>(getPenalizedTransactionListEndpoint(page));
    };

    return await handleApiServerSideErrorResponse({
        request
    });
}

export const usePenalizedTransactionPagination = (page: number) => {
    return useQuery({
        queryKey: ["penalizedTransaction", page],
        queryFn: async () => {
           return await getPenalizedTransactionRequestPagination(page);
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!page,
    });
}

export const getSpecificPenalizedTransactionItems = async (transacId: string) => {
    const request = async (): Promise<AxiosResponse<IGetSpecificTransactionItemsApiResponse>> => {
        return PahiramAxiosConfig.get<IGetSpecificTransactionItemsApiResponse>(
            specificPenalizedTransactionItemsEndpoint(transacId)
        );
    };

    return await handleApiServerSideErrorResponse({
        request
    });
};

export const useSpecificPenalizedTransactionItems = (transacId: string) => {
    return useQuery({
        queryKey: ["officeTransaction", transacId],
        queryFn: async () => {
            const {data} = await getSpecificPenalizedTransactionItems(transacId);
            return data;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !!transacId,
    });
};