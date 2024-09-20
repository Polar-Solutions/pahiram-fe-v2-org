import { useSearchParams } from "next/navigation";
import { IItemGroup } from "@/lib/interfaces";

export const getURLParams = () => {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort") || "Name";
  const filterCategory = searchParams.get("category") || "";
  const filterOffice = searchParams.get("office") || "";
  const filterSearch = searchParams.get("q") || "";
  const filterStatus = searchParams.get("status") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemGroupId: IItemGroup["item_group_id"] | undefined = (() => {
    try {
      const param = searchParams.get("item-group-id");
      return param
        ? (JSON.parse(decodeURIComponent(param)) as IItemGroup["item_group_id"])
        : undefined;
    } catch (error) {
      console.error("Failed to decode or parse item-group-id:", error);
      return undefined;
    }
  })();
  const showItemGroupModal =
    Boolean(searchParams.get("show-item-group-modal")) || undefined;
  const inCirculation = searchParams.get("in_circulation") || 0;
  return {
    sortBy,
    filterCategory,
    filterOffice,
    filterSearch,
    filterStatus,
    page,
    itemGroupId,
    showItemGroupModal,
    inCirculation,
  };
};
