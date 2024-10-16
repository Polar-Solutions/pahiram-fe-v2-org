'use client'
import React from 'react';
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import {endorserTransactionTab} from "@/signals/shared-signals";
import ApproverFilterTabs from "@/components/approver/presentational/approver-filter-tabs-component";

export default function ApproverHeader() {

    // Handler function to change the active tab
    const handleTabChange = (tab: string) => {
        endorserTransactionTab.value = tab;
        console.log('Active tab:', tab);
    };

    const tabOptions = [
        {value: 'PENDING', label: 'Pending'},
        {value: 'ACTIVE', label: 'Active'},
        {value: 'COMPLETED', label: 'Completed'}
    ];

    return (
        <div className="flex items-center justify-between">
            <DynamicBreadcrumbsComponent
                activePage="Manage Endorsements"
            />
            <ApproverFilterTabs
                values={tabOptions}
                onTabChange={handleTabChange}
            />
        </div>
    );
}
