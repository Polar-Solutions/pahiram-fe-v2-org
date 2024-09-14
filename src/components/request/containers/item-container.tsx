"use client";
// TODO: Make the filter, filter all the items and not just the currently shown ones

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useItems } from "@/hooks/borrow/useItems";
import { useFilteredItems } from "@/hooks/borrow/useFilteredItems";
import TabsAndSearchComponent from "@/components/request/presentational/tabs-and-search-component";
import RequestListSkeleton from "@/components/request/presentational/request-list-skeleton";
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import ItemsPagination from "@/components/borrow/presentational/items-pagination";
import RequestList from "@/components/request/presentational/request-list";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { useTabsStore } from "@/hooks/request/useTabs";

export default function ItemsContainer() {
    const { page: currentPage } = getURLParams(); 
    const { items, isFetchingItems, totalPages } = useItems(currentPage);
    const filteredItems = useFilteredItems({ items }); 
    const { activeTab } = useTabsStore();

    const [showFilters, setShowFilters] = useState(true);
    const [gridColumns, setGridColumns] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);
    const { filterSearch } = getURLParams();

    const requestTabs = [
        { value: 'request', label: 'Request' },
        { value: 'transaction', label: 'Transaction' },
    ];

    // Layout update for responsive design
    const updateLayout = useCallback(() => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setShowFilters(width >= 768);
            setGridColumns(width < 600 ? 1 : width < 900 ? 2 : 3);
        }
    }, []);

    useEffect(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, [updateLayout]);

    const router = useRouter();

    // Handle pagination changes
    const handlePageChange = useCallback((page: number) => {
        const newUrl = updateURLParams({ page: page.toString() });
        router.push(newUrl);
    }, [router]);

    return (
        <motion.div
            ref={containerRef}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <TabsAndSearchComponent />

            {/* List of requests or transactions */}
            <div className="grid grid-cols-1 gap-4">
                {isFetchingItems ? (
                    // Show a skeleton loader when fetching items
                    <RequestListSkeleton />
                ) : filteredItems && filteredItems.length > 0 ? (
                    // Show filtered items if available
                    <RequestList selectedTab={requestTabs[0].value}/>
                ) : (
                    // Show a no results message if no items found
                    <p className="text-center text-muted-foreground col-span-full">
                        No results found {filterSearch ? `for "${filterSearch}"` : ""}
                    </p>
                )}
            </div>
        </motion.div>
    );
}