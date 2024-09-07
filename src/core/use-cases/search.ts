import { searchItems } from "@/core/data-access/search";
import { IGetItemsPaginationApiResponse } from "@/lib/interfaces";

export const searchItemsUseCase = (modelName: string, categoryName: string, departmentAcronym: string): Promise<IGetItemsPaginationApiResponse> => {
    // TODO: Use cases before returning the search results
    return searchItems(modelName, categoryName, departmentAcronym);
}
