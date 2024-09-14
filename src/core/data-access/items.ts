"use-client"

import { getItemGroupBookedDatesEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import {
  getItemsCategoriesEndpoint,
  getItemsPaginationEndpoint,
} from "@/config/api/backend-routes/items-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import {
  IGetItemsCategoriesApiResponse,
  IGetItemsPaginationApiResponse,
} from "@/lib/interfaces";
import { handleApiServerSideErrorResponse } from "../handle-api-server-side-error-response";
import { AxiosResponse } from "axios";
import { IBookedDatesApiResponse } from "@/lib/interfaces/get-booked-dates-request-interface";
import { useQuery } from "@tanstack/react-query";


export const getItemsCategories = async (
  page: number
): Promise<IGetItemsCategoriesApiResponse> => {
  try {
    const response = await PahiramAxiosConfig.get(
      getItemsCategoriesEndpoint(page)
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
};

export const getItemsPagination = async (
  page: number
): Promise<IGetItemsPaginationApiResponse> => {
  try {
    const response = await PahiramAxiosConfig.get(
      getItemsPaginationEndpoint(page)
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
};

export const getBookedDates = async (itemGroupId: string) => {
  const request = async (): Promise<AxiosResponse<IBookedDatesApiResponse>> => {
    return PahiramAxiosConfig.get<IBookedDatesApiResponse>(
      getItemGroupBookedDatesEndpoint(itemGroupId)
    );
  };

  return await handleApiServerSideErrorResponse({
    request,
    successMessage: "sfsf",
  });
};

// React Query Hook for fetching booked dates
export const useBookedDates = (itemGroupId: string) => {
  return useQuery({
    queryKey: ["bookedDates", itemGroupId], // Unique key for this query
    queryFn: () => getBookedDates(itemGroupId), // The function to fetch the data
    staleTime: 60000, // Optional: cache the data for 60 seconds
    refetchOnWindowFocus: false, // Optional: control when the data should refetch
  });
};
