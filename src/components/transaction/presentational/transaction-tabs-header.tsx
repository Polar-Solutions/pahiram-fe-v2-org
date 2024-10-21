'use client'
import React from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import { useTabsStore } from '@/hooks/request/useTabs';

export default function TransactionTabsHeader() {
    const { activeTab, setActiveTab} = useTabsStore();
    return (
        <div className="flex items-center justify-between">
          <DynamicBreadcrumbsComponent
            activePage="Manage Transactions"
          />
        </div>
      );
}