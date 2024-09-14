'use client'

import React, {useState} from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import { useTabsStore } from '@/hooks/request/useTabs';

export default function RequetsHeader() {
    const { activeTab, setActiveTab } = useTabsStore();

    // Handler function to change the active tab
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

  return (
    <div className="flex items-center justify-between">
            <DynamicBreadcrumbsComponent
                activePage="Manage Requests"
            />
            <FilterTabs
                values={['Request', 'Transaction']}
                onTabChange={handleTabChange}
            />
    </div>
  )
}