"use client";

import ReturnActionButton from "@/components/common/action-button/return-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { handleTransactionItemReleased } from "@/components/transaction/handle-transaction-approval";
import { useAction } from "next-safe-action/hooks";
import {
  IOfficeSpecificTransaction,
  ITransactionItemDetail,
} from "@/lib/interfaces/get-specific-transaction-interface";
import {
  useSpecificOfficeTransaction,
  useSpecificTransactionItems,
} from "@/core/data-access/requests";
import { releaseTransactionAction } from "@/core/actions/release-transaction";
import { useSelectedItemsStore } from "@/hooks/transaction/useSelectedItem";
import { hasIn } from "node_modules/cypress/types/lodash";
import ReturnModal from "./return-transaction/return-modal";

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
  items,
}: {
  transactionId: string | undefined;
  transactionStatus: string | undefined;
  selectedIds: string[]; // New prop type
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  items: IOfficeSpecificTransaction | undefined;
}) {
  const { executeAsync, isExecuting } = useAction(releaseTransactionAction);
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

  const borrowedStatuses = items
    ? Object.values(items).flatMap((product) =>
        product.items.map(
          (item: ITransactionItemDetail) => item.borrowed_item_status
        )
      )
    : [];

  const hasInPossession = borrowedStatuses.some(
    (status) => status === "IN_POSSESSION"
  );
  const hasApprovedItems = borrowedStatuses.some(
    (status) => status === "APPROVED"
  );

  const hasInPossessionSelectedItems = selectedItems.some(
    (item) => item.borrowed_item_status === "IN_POSSESSION"
  );

  const handleRelease = async (isReleased: boolean) => {
    // Create an array of item approval statuses
    const releasedItems = selectedIds.map((id) => ({
      borrowedItemId: id,
      isReleased,
    }));

    await handleTransactionItemReleased(
      transactionId,
      executeAsync,
      releasedItems
    );
    setSelectedIds([]); // Clear selected IDs after approval or decline
  };

  const isDisabled = selectedIds.length === 0;
  // const hasInPossessionSelectedItems = selectedItems.some(item => item.borrowed_item_status === "IN_POSSESSION");

  // Function to get the whole product object based on selected item IDs
  const getSelectedItemsByIds = (
    selectedIds: string[],
    data: Record<string, any>
  ) => {
    // Loop over each selectedId and find the product(s) where at least one of the items matches the borrowed_item_id
    return selectedIds
      .map(
        (selectedId) =>
          Object.entries(data).find(([productName, product]) =>
            product.items.some(
              (item: any) => item.borrowed_item_id === selectedId
            )
          )?.[1] // Return the product object (or undefined if not found)
      )
      .filter(Boolean); // Remove undefined values (in case a selectedId doesn't match anything)
  };

  useEffect(() => {
    if (items) {
      // Ensure data is available
      const selectedItemsById = getSelectedItemsByIds(selectedIds, items);
      setSelectedItems(selectedItemsById); // Set the selected items in the store
      // Log all the product objects that contain the selected items
    }
  }, [selectedIds, items]);

  console.log("ITEEEEEMMMSSS", items);

  return (
    <div
      className={`flex items-center space-x-2 ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
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
          <ReturnModal />

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
                <DropdownMenuItem onClick={() => handleRelease(false)}>
                  Withhold
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : null}
    </div>
  );
}
