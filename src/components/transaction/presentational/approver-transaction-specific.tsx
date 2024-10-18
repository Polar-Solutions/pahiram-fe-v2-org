'use client';
import React from 'react';
import ApproverReqTransCardHeader from '@/components/transaction/presentational/approver-transaction-header';
import OfficerApprovalButtonGroup from './transaction-approval-button-group';
import {Badge} from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import TransactionDetails from '@/components/transaction/presentational/transaction-detail';
import ExpandTable from '@/components/common/expanding-table/expanding-table';
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";
import { useSearchParams, useRouter } from 'next/navigation';
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { formatBorrowStatus, formatBorrowPurpose } from '@/helper/formatting-utilities';
import { useEditRequest } from '@/hooks/request/useEditRequest';

export default function ApproverSpecificReqTrans({ transactionId}: {transactionId: string}) {
  const {getRequestById} = useTransactionStore();
  console.log("IDD", transactionId)
  const searchParams = useSearchParams();

  const transaction = getRequestById("transaction", transactionId);
  const items = JSON.parse(searchParams.get('items') || '[]');

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
          <OfficerApprovalButtonGroup transactionId={transaction?.id}/>
      </ApproverReqTransCardHeader>

      {/* Badges Section */}
      <div className="flex items-center space-x-2">
          <Badge variant="secondary">{transaction?.items.length} items</Badge>
      </div>

      {/* Transaction Period */}
      <p className="text-sm text-muted-foreground">{transaction?.custom_transac_id}</p>
      <p className="text-sm">
          Total Borrowing Period: September 11, 2024 to September 19, 2024
      </p>

      {/* Transaction Progress Component */}
      <TransactionProgress  
          transactionStatus={transaction?.status}
      />

      {/* Borrowing Details Component */}
      <div className="grid gap-4 md:grid-cols-2">
          <TransactionDetails transaction={transaction}/>

          {/* Borrowed Items Table Component */}
            <ExpandTable
              items={items}
              formatDateTime={formatDateTimeToHumanFormat}
              formatBorrowStatus={formatBorrowStatus}
              handleDropdownChange={handleDropdownChange}
              isEditing={isEditing}
              modelNames={[]} // Add model names if necessary
            />
      </div>
  </div>
  );
}
