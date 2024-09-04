import {useEffect, useRef, useState} from "react";
import {getItemsPaginationUseCase} from "@/core/use-cases/items";
import {IItem} from "@/lib/interfaces";
import {getURLParams} from "@/helper/borrow/getURLParams";

export const useItems = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingItems, setIsFetchingItems] = useState(false);

    // Use a ref to store cached items per page
    const cachedItems = useRef<{ [page: number]: IItem[] }>({});
    const cachedTotalPages = useRef<number>(1);

    const {page} = getURLParams();

    useEffect(() => {
        async function loadItems(page: number) {
            if (cachedItems.current[page]) {
                setItems(cachedItems.current[page]);
                setTotalPages(cachedTotalPages.current);
            } else {
                try {
                    setIsFetchingItems(true);
                    const getItemsPaginationApiResponse = await getItemsPaginationUseCase(page);
                    const itemsPaginationData = getItemsPaginationApiResponse?.data;

                    setItems(itemsPaginationData.items);
                    cachedItems.current[page] = itemsPaginationData.items; // Cache items per page
                    setTotalPages(itemsPaginationData.last_page);
                    cachedTotalPages.current = itemsPaginationData.last_page; // Cache total pages
                } catch (error) {
                    console.error('Error fetching items:', error);
                    // Handle error (e.g., show error message to user)
                } finally {
                    setIsFetchingItems(false);
                }
            }
        }

        loadItems(page);
    }, [page]);

    return {
        items,
        isFetchingItems,
        totalPages,
        page
    };
};
