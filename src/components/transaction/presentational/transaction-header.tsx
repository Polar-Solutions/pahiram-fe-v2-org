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
            onApprove={async () => {
                return new Promise((resolve, reject) => {
                    try {
                        // Simulate an asynchronous operation (like an API call)
                        setTimeout(() => {
                            console.log("Approval process completed.");
                        }, 1000); // Simulate a delay of 1 second
                    } catch (error) {
                        reject("Approval failed");
                    }
                });
            }}
            onDecline={async () => {
                return new Promise((resolve, reject) => {
                    try {
                        // Simulate an asynchronous operation (like an API call)
                        setTimeout(() => {
                            console.log("Approval process completed.");
                        }, 1000); // Simulate a delay of 1 second
                    } catch (error) {
                        reject("Approval failed");
                    }
                });
            }}
        />
    </div>
  )
}
