'use client'
import React from 'react'
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';
import ActionButton from '@/components/common/action-button/button';

export default function TransactionHeader() {
  return (

    <div className="flex items-center justify-between">
        <DynamicBreadcrumbsComponent
            activePage="Manage Transaction"
        />
        <ActionButton
            approveText="Approve all"
            declineText="Decline all"
            onApprove={() => console.log('Approve')}
            onDecline={() => console.log('Decline')}
        />
    </div>
  )
}
