'use client';

import React, { useCallback } from 'react';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import { SearchBar } from '@/components/common/search-bar/search-bar';
import MobileFilterAndSearchComponent from "@/components/borrow/presentational/mobile-filter-and-search-component";
import { useSearch } from '@/hooks/borrow/useSearch';
import { useTabsStore } from '@/hooks/request/useTabs';
import { LENDING_OFFICES_ACRONYMS, OFFICES_CONSTANTS } from '@/CONSTANTS/OFFICES_CONSTANTS';
import { Check } from "lucide-react";
import { cn } from '@/lib/utils';

interface TabsAndSearchComponentProps {
    endorsement: any;
}

export default function TabsSearchComponent() {
    const { activeTab, selectedFilterTab, setActiveTab, setSelectedFilterTab, filterOffice, setFilterOffice } = useTabsStore();
    const { searchQuery, setSearchQuery } = useSearch();

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
      }
    
    // Handler function to change the active tab
      const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        console.log('Active tab:', tab);
    };

    
      const tabOptions = [
        { value: 'ALL', label: 'All' },
        { value: 'PENDING_ENDORSER_APPROVAL', label: 'Pending' },
        { value: 'ON_GOING', label: 'Active' },
        { value: 'TRANSACTION_COMPLETE', label: 'Completed'}
      ];
    

        return (
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                <FilterTabs
                  values={tabOptions}
                  onTabChange={handleTabChange}
                />
        
                </div>
        
                {/* Right side: Search Bar for larger screens */}
                <div className="hidden md:flex w-full md:w-auto overflow-hidden">
                  <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} placeholder="Search request/transaction ID" />
                </div>
              </div>
            </div>
          );
}