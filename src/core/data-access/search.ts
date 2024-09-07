import { cache } from 'react';
import { IGetItemsPaginationApiResponse } from "@/lib/interfaces";
import { getParsedAuthCookie } from "@/core/data-access/cookies";
import {PahiramAxiosConfig} from '@/config/api/BackendAxiosConfig'

// Preload functions
export const preloadSearchResults = (modelName: string, categoryName: string, departmentAcronym: string) => {
    void searchItems(modelName, categoryName, departmentAcronym);
}

// Cached search function
export const searchItems = cache(async (modelName: string, categoryName: string, departmentAcronym: string): Promise<IGetItemsPaginationApiResponse> => {
    try {
        const response = await PahiramAxiosConfig.get(`/item-inventory`, {
            params: {
                model_name: modelName,
                category_name: categoryName,
                department_acronym: departmentAcronym
            },
            timeout: 10000
        });
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error searching items:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to search items: ${error.message}`);
        } else {
            throw new Error('Failed to search items: Unknown error');
        }
    }
});

