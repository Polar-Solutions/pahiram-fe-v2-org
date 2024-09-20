import { getItemGroupBookedDatesEndpoint } from "@/config/api/backend-routes/borrow-request-routes";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import {
  getItemsCategories,
  getItemsPagination,
} from "@/core/data-access/items";
import { handleApiServerSideErrorResponse } from "../handle-api-server-side-error-response";
import { AxiosResponse } from "axios";

export const getItemsPaginationUseCase = async (page: number) => {
  // TODO: Use cases before returning the items
  const { data } = await getItemsPagination(page);
  console.log(data.items)
  return {
    data: {
      items: data?.items,
      last_page: data?.last_page,
    },
  };

};

export const getItemsCategoriesUseCase = async (page: number) => {
  // TODO: Use cases before returning the item categories
  const { data } = await getItemsCategories(page);
  return {
    data: {
      categories: data?.categories,
      last_page: data?.last_page,
    },
  };
};
