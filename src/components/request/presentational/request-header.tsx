'use client'
import React from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import FilterTabs from "@/components/request/presentational/filter-tabs-component";
import { useTabsStore } from '@/hooks/request/useTabs';

export default function RequetsHeader({id}: { id?: string }) {
  const { activeTab, setActiveTab } = useTabsStore();

  // Handler function to change the active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Active tab:', tab);
  };

  const tabOptions = [
    { value: 'REQUEST', label: 'Request' },
    { value: 'TRANSACTION', label: 'Transaction' }
  ];

  return (
    <div className="flex items-center justify-between">
      <DynamicBreadcrumbsComponent
          activePage={id || "Manage Requests"}
          items={[{
              name: "Manage Requests",
              url: "/borrow/manage-requests",
          }
          ]}
      />
      <FilterTabs
        values={tabOptions}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
