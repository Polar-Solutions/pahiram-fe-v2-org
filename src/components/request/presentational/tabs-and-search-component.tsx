'use client'

import React, { useState } from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
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
import RequestList from '@/components/request/presentational/request-list';
import { useTabsStore } from '@/hooks/request/useTabs';

export default function RequetsHeader() {

  const { activeTab, selectedFilterTab, setActiveTab, setSelectedFilterTab} = useTabsStore();

  // Function to handle the filter tab change
  const handleFilterTabChange = (value: string) => {
    setSelectedFilterTab(value);
  };

  const filterValues = activeTab === 'Request'
    ? ['Pending', 'Cancelled', 'Disapproved']  
    : ['Approved', 'On Going', 'Completed', 'Unreturned'];  

  return (
    <>
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <FilterTabs values={filterValues} onTabChange={handleFilterTabChange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {"All Categories"}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground">
                All Categories
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Add logic to render category items if necessary */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: Search Bar */}
        <div className="flex">
          <SearchBar searchQuery="" placeholder="Search request/transaction ID" />
        </div>
      </div>

      {/* RequestList Component (pass selectedFilterTab to display the relevant items) */}
      <RequestList selectedTab={selectedFilterTab} />
    </div>
    </>
  );
}