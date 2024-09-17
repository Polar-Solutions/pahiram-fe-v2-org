import { useMemo } from "react";
import { IBorrowRequest } from "@/lib/interfaces";
import { getURLParams } from "@/helper/borrow/getURLParams";

export const useFilteredRequests = ({ requests }: { requests: IBorrowRequest[] }) => {
  const { filterSearch, filterStatus } = getURLParams();

  return useMemo(() => {
    if (!requests) return []; // Return an empty array if requests is undefined

    return requests
      .filter((request) => {
        if (filterStatus && request.transac_status !== filterStatus) {
          return false;
        }
        if (filterSearch) {
          const searchLower = filterSearch.toLowerCase();
          return request.custom_transac_id.toLowerCase().includes(searchLower);
        }
        return true;
      });
  }, [requests, filterStatus, filterSearch]);
};
