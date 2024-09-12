import {getItemsCategories, getItemsPagination} from "@/core/data-access/items";

export const getItemsPaginationUseCase = async (page: number) => {
    // TODO: Use cases before returning the items
    const {data} = await getItemsPagination(page);
    return {
        data: {
            items: data?.items,
            last_page: data?.last_page
        }
    }
}

export const getItemsCategoriesUseCase = async (page: number) => {
    // TODO: Use cases before returning the item categories
    const {data} = await getItemsCategories(page);
    return {
        data: {
            categories: data?.categories,
            last_page: data?.last_page
        }
    }
}