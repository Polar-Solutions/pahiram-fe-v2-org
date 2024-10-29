"use client";

import ActionButton from "@/components/common/action-button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { handleTransactionApproval, handleTransactionItemApproval } from "@/components/transaction/handle-transaction-approval";
import { useAction } from "next-safe-action/hooks";
import { approveTransactionAction } from "@/core/actions/approve-transaction";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function PenaltyApprovalButtonGroup({
    transactionId,
    transactionStatus,
    selectedIds,
    setSelectedIds
}: {
    transactionId: string | undefined,
    transactionStatus: string | undefined;
    selectedIds: string[]; // New prop type
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {

    const { executeAsync, isExecuting } = useAction(approveTransactionAction);

    const handleApproval = async (isApproved: boolean) => {
        // Create an array of item approval statuses
        const approvalItems = selectedIds.map(id => ({
            borrowedItemId: id,
            isApproved,
        }));

        // Call the handler with the constructed body
        await handleTransactionItemApproval(transactionId, executeAsync, approvalItems);
        setSelectedIds([]); // Clear selected IDs after approval or decline
    };

    const isDisabled = selectedIds.length === 0;

    return (
        <div className={`flex items-center space-x-2 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
            {/* Show buttons only if transactionStatus is PENDING_BORROWING_APPROVAL */}
            {transactionStatus === "PENDING_BORROWING_APPROVAL" && (
                <ActionButton
                    approveText="Approve"
                    declineText="Decline"
                    onApprove={() => handleApproval(true)} // Pass true for approval
                    onDecline={() => handleApproval(false)} // Pass false for decline
                    loading={isExecuting}
                    modalTitleApprove="Approve Transaction"
                    modalTitleDecline="Decline Transaction"
                    modalDescApprove="Are you sure you want to approve this transaction?"
                    modalDescDecline="Are you sure you want to decline this transaction?"
                />
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Contact Borrower</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
