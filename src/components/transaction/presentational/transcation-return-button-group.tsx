"use client";

import ReturnActionButton from "@/components/common/action-button/return-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React, {useState, useEffect} from "react";
import { handleTransactionItemReleased } from "@/components/transaction/handle-transaction-approval";
import { useAction } from "next-safe-action/hooks";
import { IOfficeSpecificTransaction } from '@/lib/interfaces/get-specific-transaction-interface';
import { useSpecificOfficeTransaction } from '@/core/data-access/requests';
import { releaseTransactionAction } from "@/core/actions/release-transaction";
import ReturnModal from '@/components/transaction/presentational/return-modal'
import { useSelectedItemsStore } from "@/hooks/transaction/useSelectedItem";



interface BorrowedItem {
  id: string;
  item_group_id: string;
  model_name: string;
  quantity: number;
  start_date: string;
  due_date: string;
  borrowed_item_status: string;
  apc_item_id: string;
}


export default function OfficerReturnButtonGroup({
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
  const { data } = useSpecificOfficeTransaction(transactionId || '');

  const itemsTransaction = data?.data?.items || [];
  const items = Array.isArray(itemsTransaction) ? itemsTransaction.map((item: IOfficeSpecificTransaction) => item) : [];
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

  const handleRelease = async (isReleased: boolean) => {
    // Create an array of item approval statuses
    const releasedItems = selectedIds.map(id => ({
      borrowedItemId: id,
      isReleased,
    }));

    await handleTransactionItemReleased(transactionId, executeAsync, releasedItems);
    setSelectedIds([]); // Clear selected IDs after approval or decline
  }

  const isDisabled = selectedIds.length === 0; 
  const hasInPossession = items.some(item => item.borrowed_item_status === "IN_POSSESSION");
  const hasApprovedItems = items.some(item => item.borrowed_item_status === "APPROVED");

 // Function to get selected items based on selected IDs
 const getSelectedItemsById = (selectedIds: string[], items: BorrowedItem[]) => {
  return items.filter(item => selectedIds.includes(item.id));
};

// Use useEffect to update the Zustand store only when selectedIds or items change
useEffect(() => {
  const selectedItemsById = getSelectedItemsById(selectedIds, items);

  // Check if the new selected items are different from the current state in the store
  const isSelectedItemsDifferent = JSON.stringify(selectedItems) !== JSON.stringify(selectedItemsById);
  if (isSelectedItemsDifferent) {
    setSelectedItems(selectedItemsById); 
    console.log(selectedItemsById);
  }
}, [selectedIds, items, selectedItems, setSelectedItems]);

const hasInPossessionSelectedItems = selectedItems.some(item => item.borrowed_item_status === "IN_POSSESSION");

  return (
    <div className={`flex items-center space-x-2 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
    {transactionStatus === "ON_GOING" && hasInPossession ? (
      <>
        {hasApprovedItems && (
          <>
            {/* Show Release and Facilitate Return buttons if there are approved items */}
            <ReturnActionButton
              approveText="Release"
              onApprove={() => handleRelease(true)} // Pass true for approval
              loading={isExecuting}
              modalTitleApprove="Release Transaction"
              modalDescApprove="Are you sure you want to release this transaction?"
            />
          </>
        )}
        {/* Show Facilitate Return button if there are items in possession */}
        <ReturnModal/> 

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Contact Borrower</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            {/* Remove Withhold option if no approved items */}
            {transactionStatus === "ON_GOING" && hasApprovedItems && (
              <DropdownMenuItem onClick={() => handleRelease(false)}>Withhold</DropdownMenuItem>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ) : null}
  </div>
  );
}
