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
  borrow_requests: any;
}

export default function TabsAndSearchComponent({ borrow_requests }: TabsAndSearchComponentProps) {
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

  const filterValues = activeTab === 'REQUEST'
  ? [
      { value: 'PENDING', label: 'Pending' },
      { value: 'CANCELLED', label: 'Cancelled' },
      { value: 'DISAPPROVED', label: 'Disapproved' }
    ]
  : [
      { value: 'APPROVED', label: 'Approved' },
      { value: 'ON_GOING', label: 'On Going' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'UNRETURNED', label: 'Unreturned' }
    ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterTabs values={filterValues} onTabChange={handleFilterTabChange} />

          {/* Office Dropdown for larger screens */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {filterOffice || "All Department"}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {/* "All Offices" Option */}
                <DropdownMenuItem
                  onSelect={() => handleOfficeChange("")}
                  className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
                >
                  <Check className={cn("mr-2 h-4 w-4", filterOffice === "" ? "opacity-100" : "opacity-0")} />
                  All Department
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Dynamic Office Options */}
                {LENDING_OFFICES_ACRONYMS.map((officeAcronym) => (
                  <DropdownMenuItem
                    key={officeAcronym}
                    onSelect={() => handleOfficeChange(officeAcronym)}
                    className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filterOffice === officeAcronym ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{`${officeAcronym} | ${OFFICES_CONSTANTS[officeAcronym].office}`}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Filter and Search Component */}
          <div className="block md:hidden w-full">
            <MobileFilterAndSearchComponent />
          </div>
        </div>

        {/* Right side: Search Bar for larger screens */}
        <div className="hidden md:flex w-full md:w-auto overflow-hidden">
          <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} placeholder="Search request/transaction ID" />
        </div>
      </div>
    </div>
  );
}
