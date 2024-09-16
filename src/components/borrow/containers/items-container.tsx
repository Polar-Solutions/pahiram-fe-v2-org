"use client";
// TODO: Make the filter, filter all the items and not just whats

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpecificItemModal from "@/components/borrow/presentational/item-modal";
import { useItems } from "@/hooks/borrow/useItems";
import { useFilteredItems } from "@/hooks/borrow/useFilteredItems";
import FilterAndSearchComponent from "@/components/borrow/presentational/filter-and-search-component";
import ItemCardSkeleton from "@/components/borrow/presentational/item-card-skeleton";
import ItemsPagination from "@/components/borrow/presentational/items-pagination";
import ItemsList from "@/components/borrow/presentational/items-list";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";

export default function ItemsContainer() {
  const { page, filterSearch, showItemGroupModal } = getURLParams();
  const { items, isFetchingItems, totalPages } = useItems(page);

  const filteredItems = useFilteredItems({ items });

  const [showFilters, setShowFilters] = useState(true);
  const [gridColumns, setGridColumns] = useState(3);

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

  const [renderKey, setRenderKey] = useState(0);

  return (
    <motion.div
      key={renderKey}
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FilterAndSearchComponent showFilters={showFilters} />

      <div
        className={`grid gap-4 ${
          gridColumns === 1
            ? "grid-cols-1"
            : gridColumns === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {isFetchingItems ? (
          <ItemCardSkeleton />
        ) : filteredItems && filteredItems.length > 0 ? (
          <ItemsList items={filteredItems} />
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            No results found {filterSearch ? `for ${filterSearch}` : null}
          </p>
        )}
      </div>

      <div className="mt-4">
        <ItemsPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Render modal if show-item-group-modal exists in URL */}
      {showItemGroupModal &&
          <SpecificItemModal />
      }
    </motion.div>
  );
}
