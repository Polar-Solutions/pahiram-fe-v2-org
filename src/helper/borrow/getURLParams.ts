import {useSearchParams} from "next/navigation";
import {IItem} from "@/lib/interfaces";

export const getURLParams = () => {
    const searchParams = useSearchParams();

    const sortBy = searchParams.get('sort') || "Name";
    const filterCategory = searchParams.get('category') || "";
    const filterOffice = searchParams.get('office') || "";
    const filterSearch = searchParams.get('q') || "";
    const page = Number(searchParams.get('page')) || 1;
    const item = searchParams.get('item') ? JSON.parse(decodeURIComponent(searchParams.get('item')!)) as IItem : undefined;
    const showModalItem = Boolean(searchParams.get('showModalItem')) || undefined;

    return {
        sortBy,
        filterCategory,
        filterOffice,
        filterSearch,
        page,
        item,
        showModalItem
    }
}