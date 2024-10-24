'use client';
import React, {useState, useEffect} from 'react';
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
import { useSpecificOfficeTransaction } from '@/core/data-access/requests';
import { IOfficeSpecificTransaction } from '@/lib/interfaces/get-specific-transaction-interface';
import OfficerReleasedButtonGroup from '@/components/transaction/presentational/transaction-release-button-group';
import { useTransactionData } from '@/hooks/transaction/useTransaction';

export default function ApproverSpecificReqTrans({ transactionId}: {transactionId: string}) {
  const {getRequestById} = useTransactionStore();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { setApcId} = useTransactionData();

  const transaction = getRequestById("transaction", transactionId);

  const { data } = useSpecificOfficeTransaction(transaction?.id || '');

  useEffect(() => {
    if (transaction?.apc_id) {
      setApcId(transaction.apc_id);
    }
  }, [transaction?.apc_id, setApcId]);
  
  const itemsTransaction = data?.data?.items  || []; 
  // Accessing the start dates
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

  const hasApprovedItems = items.some((item) => item.borrowed_item_status === 'APPROVED');
  const shouldShowReleaseButton = transaction?.status === 'ON_GOING' && hasApprovedItems;
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
          <OfficerApprovalButtonGroup transactionId={transaction?.id} transactionStatus={transaction?.status} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        ) : transaction?.status === 'APPROVED' || shouldShowReleaseButton ? (
          <OfficerReleasedButtonGroup transactionId={transaction?.id} transactionStatus={transaction?.status} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        ) : null}


      </ApproverReqTransCardHeader>

      {/* Badges Section */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">
          {transaction?.items.reduce((total, item) => total + item.quantity, 0)} items
        </Badge>
      </div>



      {/* Transaction Period */}
      <p className="text-sm">
          Total Borrowing Period: {} to September 19, 2024
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
              selectedIds={selectedIds} // Pass selectedIds if needed
              setSelectedIds={setSelectedIds} // Pass setSelectedIds if needed
            />
      </div>
  </div>
  );
}
