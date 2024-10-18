"use client";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {getURLParams} from "@/helper/borrow/getURLParams";
import {updateURLParams} from "@/helper/borrow/updateURLParams";
import {motion} from "framer-motion";
import TabsSearchComponent from "@/components/transaction/presentational/tabs-search-component";
import EndorsementList from "@/components/endorsement/presentational/endorsement-list";
import TransactionPagination from "@/components/transaction/presentational/transaction.pagination";
import {useEndorsements} from "@/hooks/endorsement/useEndorsements";


export default function EndorsementContainer() {
    const {page, filterSearch, showItemGroupModal} = getURLParams();
    const {endorsementTransactions, isFetchingEndorsementTransaction, totalPages} = useEndorsements(page);

    const [showFilters, setShowFilters] = useState(true);
    const [gridColumns, setGridColumns] = useState(3);
    const [renderKey, setRenderKey] = useState(0); // Initialize renderKey here

    const containerRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const handlePopState = () => {
            // Re-render the component when the user navigates back/forward
            setRenderKey(prev => prev + 1);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handlePageChange = useCallback((page: number) => {
        const newUrl = updateURLParams({page: page.toString()});
        window.history.pushState({}, '', newUrl);
        // Trigger a re-render
        setRenderKey(prev => prev + 1);
    }, []);


    return (
        <motion.div
            key={renderKey}
            ref={containerRef}
            className="w-full"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >

            <TabsSearchComponent/>

            <EndorsementList endorsements={endorsementTransactions}/>
            <div className="mt-4">
                <TransactionPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </motion.div>
    );
}
