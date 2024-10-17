"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TransactionCard from '@/components/transaction/presentational/transaction-card';
import TransactionPagination from '@/components/transaction/presentational/transaction.pagination';
import { getURLParams } from "@/helper/borrow/getURLParams";
import { useTransaction } from '@/hooks/transaction/useTransaction';
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { motion } from "framer-motion";
import TransactionList from "../presentational/transaction-list";
import TabsSearchComponent from "@/components/transaction/presentational/tabs-search-component";
import { useFilteredRequests } from "@/hooks/request/useFilteredRequests";

export default function TransactionContainer() {
  const { page, filterSearch, showItemGroupModal } = getURLParams();
  const { officeTransaction, isFetchingOfficeTransaction, totalPages } = useTransaction(page);

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
    const newUrl = updateURLParams({ page: page.toString() });
    window.history.pushState({}, '', newUrl);
    // Trigger a re-render
    setRenderKey(prev => prev + 1);
  }, []);

  return (
    <motion.div
      key={renderKey}
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <TabsSearchComponent/>

      <TransactionList transactions={officeTransaction} />
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
