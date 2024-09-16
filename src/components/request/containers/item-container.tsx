"use client";
// TODO: Make the filter, filter all the items and not just the currently shown ones

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRequests } from "@/hooks/request/useRequests";
import { useFilteredRequests } from "@/hooks/request/useFilteredRequests";
import TabsAndSearchComponent from "@/components/request/presentational/tabs-and-search-component";
import RequestListSkeleton from "@/components/request/presentational/request-list-skeleton";
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import RequestPagination from "@/components/request/presentational/request-pagination";
import RequestList from "@/components/request/presentational/request-list";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { useTabsStore } from "@/hooks/request/useTabs";

export default function ItemsContainer() {
    const {page, filterSearch} = getURLParams();
    const { requests, isFetchingRequests, totalPages } = useRequests(page);
    const { activeTab } = useTabsStore();

    const filteredRequests = useFilteredRequests({ requests });

    const [showFilters, setShowFilters] = useState(true);
    const [gridColumns, setGridColumns] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);

    const requestTabs = [
        { value: 'Request', label: 'Request' },
        { value: 'Transaction', label: 'Transaction' },
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
            <TabsAndSearchComponent borrow_requests={filteredRequests}/>

            <div
                className={`grid gap-1 ${
                gridColumns === 1
                    ? "grid-cols-1"
                    : ""
                }`}
            >
                {isFetchingRequests ? (
                    <RequestListSkeleton />
                ) : filteredRequests && filteredRequests.length > 0 ? (
                    <RequestList
                        borrow_requests={filteredRequests}
                    />
                ) : (
                <p className="text-center text-muted-foreground col-span-full">
                    No results found {filterSearch ? `for ${filterSearch}` : null}
                </p>
                )}
            </div>

            <div className="mt-4">
                <RequestPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            </div>
            
        </motion.div>
    );
}