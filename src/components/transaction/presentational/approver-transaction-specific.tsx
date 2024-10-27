'use client';
import React, { useState, useEffect } from 'react';
import ApproverReqTransCardHeader from '@/components/transaction/presentational/approver-transaction-header';
import OfficerApprovalButtonGroup from './transaction-approval-button-group';
import { Badge } from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import TransactionDetails from '@/components/transaction/presentational/transaction-detail';
import ExpandTable from '@/components/common/expanding-table/expanding-table';
import { useTransactionStore } from "@/hooks/stores/useTransactionStore";
import { useSearchParams } from 'next/navigation';
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { formatBorrowStatus } from '@/helper/formatting-utilities';
import { useEditRequest } from '@/hooks/request/useEditRequest';
import { useSpecificOfficeTransaction } from '@/core/data-access/requests';
import { IOfficeSpecificTransaction } from '@/lib/interfaces/get-specific-transaction-interface';
import OfficerReleasedButtonGroup from '@/components/transaction/presentational/transaction-release-button-group';
import { useTransactionData } from '@/hooks/transaction/useTransaction';
import OfficerReturnButtonGroup from './transcation-return-button-group';

export default function ApproverSpecificReqTrans({ transactionId }: { transactionId: string }) {
  const { getRequestById } = useTransactionStore();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { setApcId } = useTransactionData();

  const transaction = getRequestById("transaction", transactionId);
  const { data } = useSpecificOfficeTransaction(transaction?.id || '');

  useEffect(() => {
    if (transaction?.apc_id) {
      setApcId(transaction.apc_id);
    }
  }, [transaction?.apc_id, setApcId]);

  const itemsTransaction = data?.data?.items || [];
  const items = Array.isArray(itemsTransaction) ? itemsTransaction.map((item: IOfficeSpecificTransaction) => item) : [];

  const { isEditing, setEditedDetails } = useEditRequest();

  // Handle changes for dropdowns
  const handleDropdownChange = (value: string, field: string, index: number) => {
    setEditedDetails((prevDetails: any) => ({
      ...prevDetails,
      [index]: {
        ...prevDetails[index],
        [field]: value,
      },
    }));
  };

  // Convert start_date and due_date strings to Date objects and extract the dates
  const startDates = items.map(item => new Date(item.start_date));
  const dueDates = items.map(item => new Date(item.due_date));

  // Find the earliest start date and the latest due date
  const earliestStartDate = new Date(Math.min(...startDates.map(date => date.getTime())));
  const latestDueDate = new Date(Math.max(...dueDates.map(date => date.getTime())));

  // Utility functions to check item status
  const isApproved = (itemId: string) => {
    const item = items.find(item => item.id === itemId);
    return item?.borrowed_item_status === 'APPROVED';
  };

  const isInPossession = (itemId: string) => {
    const item = items.find(item => item.id === itemId);
    return item?.borrowed_item_status === 'IN_POSSESSION';
  };

  const hasApprovedItems = items.some((item) => item.borrowed_item_status === 'APPROVED');
  const hasInPossession = items.some(item => item.borrowed_item_status === 'IN_POSSESSION');
  const shouldShowReleaseButton = transaction?.status === 'ON_GOING' && hasApprovedItems;

  // Check if any selected item is 'APPROVED' and not 'IN_POSSESSION'
  const hasApprovedNotInPossession = selectedIds.some(itemId => isApproved(itemId) && !isInPossession(itemId));

  // Check if all selected items are 'IN_POSSESSION'
  const shouldShowOfficerReturnButtonGroup = selectedIds.every(isInPossession) && !hasApprovedNotInPossession;
  const shouldShowOfficerReleasedButtonGroup = selectedIds.some(isApproved);

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Header Component */}
      <ApproverReqTransCardHeader
        withBackArrow={true}
        borrowerName={transaction?.borrower}
        borrowerId={transaction?.apc_id}
        submissionDate={transaction?.created_at
          ? formatDateTimeToHumanFormat(transaction.created_at)
          : 'N/A'}
        transactionId={transaction?.custom_transac_id}
        id={transaction?.id}
      >
        {transaction?.status === 'PENDING_BORROWING_APPROVAL' ? (
          <OfficerApprovalButtonGroup
            transactionId={transaction?.id}
            transactionStatus={transaction?.status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : shouldShowOfficerReturnButtonGroup ? (
          // Show the Return Button Group only if conditions are met
          <OfficerReturnButtonGroup
            transactionId={transaction?.id}
            transactionStatus={transaction?.status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : shouldShowOfficerReleasedButtonGroup || shouldShowReleaseButton ? (
          // Show the Release Button Group if any selected item is 'APPROVED' or the transaction is 'ON_GOING'
          <OfficerReleasedButtonGroup
            transactionId={transaction?.id}
            transactionStatus={transaction?.status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : null}
      </ApproverReqTransCardHeader>

      {/* Badges Section */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">
          {transaction?.status
            .toLowerCase()         // Convert to lowercase
            .split('_')            // Split by underscore
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ')
          }
        </Badge>

        <Badge variant="secondary">
          {transaction?.items.reduce((total, item) => total + item.quantity, 0)} items
        </Badge>
      </div>

      <div>
        <p className='text-sm'>
          Total Borrowing Period:
          {" "}
          {earliestStartDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}
          {" "}
          to
          {" "}
          {latestDueDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}
        </p>
      </div>

      {/* Transaction Progress Component */}
      <TransactionProgress
        transactionStatus={transaction?.status}
      />

      {/* Borrowing Details Component */}
      <div className="grid gap-4 md:grid-cols-2">
        <TransactionDetails transaction={transaction} />

        {/* Borrowed Items Table Component */}
        <ExpandTable
          items={items}
          formatDateTime={formatDateTimeToHumanFormat}
          formatBorrowStatus={formatBorrowStatus}
          handleDropdownChange={handleDropdownChange}
          isEditing={isEditing}
          modelNames={[]} // Add model names if necessary
          selectedIds={selectedIds} // Pass selectedIds if needed
          setSelectedIds={setSelectedIds} // Pass setSelectedIds if needed
        />
      </div>
    </div>
  );
}

