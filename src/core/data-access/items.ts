import {getItemsCategoriesEndpoint, getItemsPaginationEndpoint} from "@/config/api/backend-routes/items-routes";
import {PahiramAxiosConfig} from "@/config/api/BackendAxiosConfig";
import {IGetItemsCategoriesApiResponse, IGetItemsPaginationApiResponse} from "@/lib/interfaces";

export const getItemsCategories = async (page: number): Promise<IGetItemsCategoriesApiResponse> => {
    try {
        const response = await PahiramAxiosConfig.get(getItemsCategoriesEndpoint(page));
        if (!response.status || response.status >= 400) {
            const errorBody = await response.statusText;
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error('Failed to fetch items: Unknown error');
        }
    }
}

export const getItemsPagination = async (page: number): Promise<IGetItemsPaginationApiResponse> => {

    try {
        const response = await PahiramAxiosConfig.get(getItemsPaginationEndpoint(page));
        if (!response.status || response.status >= 400) {
            const errorBody = await response.statusText;
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        } else {
            throw new Error('Failed to fetch items: Unknown error');
        }
    }
  };