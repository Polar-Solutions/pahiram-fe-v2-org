"use client";

import ActionButton from "@/components/common/action-button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { handleTransactionItemReleased } from "@/components/transaction/handle-transaction-approval";
import { useAction } from "next-safe-action/hooks";
import { releaseTransactionAction } from "@/core/actions/release-transaction";

export default function OfficerReleasedButtonGroup({
  transactionId,
  transactionStatus,
  selectedIds,
  setSelectedIds,
}: {
  transactionId: string | undefined;
  transactionStatus: string | undefined;
  selectedIds: string[]; // New prop type
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { executeAsync, isExecuting } = useAction(releaseTransactionAction);

  const handleApprove = async () => {
    for (const id of selectedIds) {
      await handleTransactionItemReleased(transactionId, executeAsync, id, true);
    }
    setSelectedIds([]); // Clear selected IDs after approval
  };

  const handleDecline = async () => {
    for (const id of selectedIds) {
      await handleTransactionItemReleased(transactionId, executeAsync, id, false);
    }
    setSelectedIds([]); // Clear selected IDs after decline
  };

  const isDisabled = selectedIds.length === 0; // Check if no items are selected
 
  return (
    <div className={`flex items-center space-x-2 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Show buttons only if transactionStatus is APPROVED */}
      {transactionStatus === "APPROVED" || transactionStatus === "ON_GOING" && (
        <>
          <ActionButton
            approveText="Release"
            declineText="Withhold"
            onApprove={handleApprove}
            onDecline={handleDecline}
            modalTitleApprove="Release Transaction"
            modalTitleDecline="Withhold Transaction"
            modalDescApprove="Are you sure you want to release this transaction?"
            modalDescDecline="Are you sure you want to withhold this transaction?"
          />
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
        </>
      )}
    </div>
  );
}