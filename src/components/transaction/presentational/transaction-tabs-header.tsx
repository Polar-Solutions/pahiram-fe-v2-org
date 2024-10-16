'use client'
import React from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import { useTabsStore } from '@/hooks/request/useTabs';

export default function TransactionTabsHeader() {
    const { activeTab, setActiveTab} = useTabsStore();

    // Handler function to change the active tab
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        console.log('Active tab:', tab);
    };

    const tabOptions = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'COMPLETED', label: 'Completed'}
    ];

    return (
        <div className="flex items-center justify-between">
          <DynamicBreadcrumbsComponent
            activePage="Manage Transaction"
          />
          <FilterTabs
            values={tabOptions}
            onTabChange={handleTabChange}
          />
        </div>
      );
}