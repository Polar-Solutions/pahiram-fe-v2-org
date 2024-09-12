import {useEffect, useRef, useState} from "react";
import {getItemsPaginationUseCase} from "@/core/use-cases/items";
import {IItem} from "@/lib/interfaces";

export const useItems = (page: number) => {
    const [items, setItems] = useState<IItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingItems, setIsFetchingItems] = useState(false);

    // Use a ref to store cached items per page
    const cachedItems = useRef<{ [page: number]: IItem[] }>({});


    useEffect(() => {
        async function loadItems(page: number) {
            if (cachedItems.current[page]) {
                setItems(cachedItems.current[page]);
            } else {
                try {
                    setIsFetchingItems(true);
                    const response = await getItemsPaginationUseCase(page);
                    const itemsPaginationData = response?.data;

                    setItems(itemsPaginationData?.items);
                    cachedItems.current[page] = itemsPaginationData?.items; // Cache items per page
                    setTotalPages(itemsPaginationData?.last_page);
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
    };
};
