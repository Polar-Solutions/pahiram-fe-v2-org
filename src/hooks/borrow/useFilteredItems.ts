import { useMemo } from "react";
import { IItemGroup } from "@/lib/interfaces";
import { getURLParams } from "@/helper/borrow/getURLParams";

export const useFilteredItems = ({ items }: { items: IItemGroup[] }) => {
  const { filterOffice, filterSearch, filterCategory, sortBy } = getURLParams();

  return useMemo(() => {
    return items
      .filter((item) => {
        if (filterCategory && item.group_category !== filterCategory)
          return false;
        if (filterOffice && item.department !== filterOffice) return false;
        if (filterSearch) {
          const searchLower = filterSearch.toLowerCase();
          return (
            item.model_name.toLowerCase().includes(searchLower) ||
            (item.group_category &&
              item.group_category.toLowerCase().includes(searchLower)) ||
            (item.department &&
              item.department.toLowerCase().includes(searchLower))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Name") {
          return a.model_name.localeCompare(b.model_name);
        } else if (sortBy === "Office") {
          return a.department.localeCompare(b.department);
        }
        return 0;
      });
  }, [items, sortBy, filterCategory, filterOffice, filterSearch]);
};
