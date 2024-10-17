'use client';

import React, { useCallback } from 'react';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from "@radix-ui/react-icons";  
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
    
      // Handle office change
      const handleOfficeChange = (office: string) => {
        setFilterOffice(office);
      };
    
      // Handle filter tab change
      const handleFilterTabChange = (value: string) => {
        setSelectedFilterTab(value.toUpperCase());
      };
    
      const filterValues = activeTab === 'PENDING'
      ? [
          { value: 'FOR_APPROVAL', label: 'For Approval' },
          { value: 'FOR_RELEASE', label: 'For Release' },
        ]
      : activeTab === 'ACTIVE'
      ? [
          { value: 'ON_GOING', label: 'On Going' },
          { value: 'PAST_DUE', label: 'Past Due' },
        ]
      : [
        { value: 'RETURNED', label: 'Returned' },
        { value: 'CLOSED', label: 'Closed' },
        ];
    

        return (
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <FilterTabs values={filterValues} onTabChange={handleFilterTabChange} />
        
                </div>
        
                {/* Right side: Search Bar for larger screens */}
                <div className="hidden md:flex w-full md:w-auto overflow-hidden">
                  <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} placeholder="Search request/transaction ID" />
                </div>
              </div>
            </div>
          );
}