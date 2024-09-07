import {cache} from 'react'

// REMINDER: Use these functions as DTOs
// import {
//     experimental_taintObjectReference,
//     experimental_taintUniqueValue,
// } from 'react'
import {IGetItemsPaginationApiResponse} from "@/lib/interfaces";
import {getParsedAuthCookie} from "@/core/data-access/cookies";
import {PahiramAxiosConfig} from '@/config/api/BackendAxiosConfig'

export const preloadItemsPagination = (page: number) => {
    void getItemsPagination(page);
}

export const preloadItem = (id: string) => {
    // void evaluates the given expression and returns undefined
    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
    void getItem(id)
}

export const getItem = cache(async (id: string) => {
    try {
        const response = await PahiramAxiosConfig.get(`/item-inventory/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
});

export const getItemsPagination = async (page: number): Promise<IGetItemsPaginationApiResponse> => {
    try {
        const response = await PahiramAxiosConfig.get(`/item-inventory`, {
            params: { page }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};