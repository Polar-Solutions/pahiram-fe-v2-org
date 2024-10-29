// 'use client';
// import React, { useState, useEffect } from 'react';
// import ApproverReqTransCardHeader from '@/components/transaction/presentational/approver-transaction-header';
// import OfficerApprovalButtonGroup from './transaction-approval-button-group';
// import { Badge } from "@/components/ui/badge";
// import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
// import TransactionDetails from '@/components/transaction/presentational/transaction-detail';
// import ExpandTable from '@/components/common/expanding-table/expanding-table';
// import { useTransactionStore } from "@/hooks/stores/useTransactionStore";
// import { useSearchParams } from 'next/navigation';
// import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
// import { formatBorrowStatus } from '@/helper/formatting-utilities';
// import { useEditRequest } from '@/hooks/request/useEditRequest';
// import {useSpecificTransactionItems} from '@/core/data-access/requests';
// import { IOfficeSpecificTransaction, ITransactionItemDetail } from '@/lib/interfaces/get-specific-transaction-interface';
// import OfficerReleasedButtonGroup from '@/components/transaction/presentational/transaction-release-button-group';
// import { useTransactionData } from '@/hooks/transaction/useTransaction';
// import OfficerReturnButtonGroup from './transcation-return-button-group';
// import { has } from 'node_modules/cypress/types/lodash';
//
// export default function ApproverSpecificReqTrans({ transactionId }: { transactionId: string }) {
//     const { getRequestById } = useTransactionStore();
//     const searchParams = useSearchParams();
//     const [selectedIds, setSelectedIds] = useState<string[]>([]);
//     const { setApcId, setTransactionId } = useTransactionData();
//
//     const transaction = getRequestById("transaction", transactionId);
//
//     const { data }= useSpecificTransactionItems(transaction?.id || '');
//     const items = data?.data;
//
//     const { isEditing, setEditedDetails } = useEditRequest();
//
//     // Handle changes for dropdowns
//     const handleDropdownChange = (value: string, field: string, index: number) => {
//         setEditedDetails((prevDetails: any) => ({
//             ...prevDetails,
//             [index]: {
//                 ...prevDetails[index],
//                 [field]: value,
//             },
//         }));
//     };
//     const startDates = items ? Object.entries(items).map(([key, item]) => new Date((item as IOfficeSpecificTransaction).start_date)) : [];
//     const dueDates = items ? Object.entries(items).map(([key, item]) => new Date((item as IOfficeSpecificTransaction).due_date)) : [];
//
//     // Calculate earliest and latest dates with proper null checks
//     const earliestStartDate = startDates.length ? new Date(Math.min(...startDates.map(date => date.getTime()))) : null;
//     const latestDueDate = dueDates.length ? new Date(Math.max(...dueDates.map(date => date.getTime()))) : null;
//
//     const hasApprovedItems = items
//         ? Object.values(items).some((item) =>
//             (item as IOfficeSpecificTransaction).items.some((detail: ITransactionItemDetail) => detail.borrowed_item_status === 'APPROVED')
//         )
//         : false;
//
//     const hasInPossession = items
//         ? Object.values(items).some((item) =>
//             (item as IOfficeSpecificTransaction).items.some((detail: ITransactionItemDetail) => detail.borrowed_item_status === 'IN_POSSESSION')
//         )
//         : false;
//
//
//
//     const isApproved = (itemId: string) => {
//         // Iterate through the models in the items object
//         return (Object.values(items) as IOfficeSpecificTransaction[]).some((model: IOfficeSpecificTransaction) =>
//             model.items.some((item: ITransactionItemDetail) =>
//                 item.borrowed_item_id === itemId && item.borrowed_item_status === 'APPROVED'
//             )
//         );
//     };
//
//     const isInPossession = (itemId: string) => {
//         // Iterate through the models in the items object
//         return (Object.values(items) as IOfficeSpecificTransaction[]).some((model: IOfficeSpecificTransaction) =>
//             model.items.some((item: ITransactionItemDetail) =>
//                 item.borrowed_item_id === itemId && item.borrowed_item_status === 'IN_POSSESSION'
//             )
//         );
//     };
//
//
//     // Check if any selected item is 'APPROVED' and not 'IN_POSSESSION'
//     const hasApprovedNotInPossession = selectedIds.some(itemId => isApproved(itemId) && !isInPossession(itemId));
//     // Check if all selected items are 'IN_POSSESSION'
//     const shouldShowReleaseButton = transaction?.status === 'ON_GOING' && hasApprovedNotInPossession
//     const shouldShowOfficerReturnButtonGroup = selectedIds.every(isInPossession) && !hasApprovedNotInPossession;
//
//     return (
//         <div className="container mx-auto p-4 space-y-4">
//             {/* Header Component */}
//             <ApproverReqTransCardHeader
//                 withBackArrow={true}
//                 borrowerName={transaction?.borrower}
//                 borrowerId={transaction?.apc_id}
//                 submissionDate={transaction?.created_at
//                     ? formatDateTimeToHumanFormat(transaction.created_at)
//                     : 'N/A'}
//                 transactionId={transaction?.custom_transac_id}
//                 id={transaction?.id}
//             >
//                 {transaction?.status === 'PENDING_BORROWING_APPROVAL' ? (
//                     <OfficerApprovalButtonGroup
//                         transactionId={transaction?.id}
//                         transactionStatus={transaction?.status}
//                         selectedIds={selectedIds}
//                         setSelectedIds={setSelectedIds}
//                     />
//                 ) : transaction?.status === 'APPROVED' || shouldShowReleaseButton  ? (
//                     // Show the Return Button Group only if conditions are met
//                     <OfficerReleasedButtonGroup
//                         transactionId={transaction?.id}
//                         transactionStatus={transaction?.status}
//                         selectedIds={selectedIds}
//                         setSelectedIds={setSelectedIds}
//                     />
//                 ) : shouldShowOfficerReturnButtonGroup ? (
//                     // Show the Release Button Group when the status is 'APPROVED' or 'ON_GOING'
//                     <OfficerReturnButtonGroup
//                         transactionId={transaction?.id}
//                         transactionStatus={transaction?.status}
//                         selectedIds={selectedIds}
//                         setSelectedIds={setSelectedIds}
//                         items={items}
//                     />
//                 ) : null}
//             </ApproverReqTransCardHeader>
//
//             {/* Badges Section */}
//             <div className="flex items-center space-x-2">
//                 <Badge variant="secondary">
//                     {transaction?.status
//                         .toLowerCase()         // Convert to lowercase
//                         .split('_')            // Split by underscore
//                         .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
//                         .join(' ')
//                     }
//                 </Badge>
//
//                 <Badge variant="secondary">
//                     {transaction?.items.reduce((total, item) => total + item.quantity, 0)} items
//                 </Badge>
//             </div>
//
//             <div>
//                 <p className='text-sm'>
//                     Total Borrowing Period:
//                     {" "}
//                     {earliestStartDate ? earliestStartDate.toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: 'numeric',
//                         minute: 'numeric',
//                         hour12: true
//                     }) : 'N/A'}
//                     {" "}
//                     to
//                     {" "}
//                     {latestDueDate ? latestDueDate.toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: 'numeric',
//                         minute: 'numeric',
//                         hour12: true
//                     }) : 'N/A'}
//                 </p>
//             </div>
//
//             {/* Transaction Progress Component */}
//             <TransactionProgress
//                 transactionStatus={transaction?.status}
//             />
//
//             {/* Borrowing Details Component */}
//             <div className="grid gap-4 md:grid-cols-2">
//                 <TransactionDetails transaction={transaction} />
//
//                 {/* Borrowed Items Table Component */}
//                 <ExpandTable
//                     items={items}
//                     formatDateTime={formatDateTimeToHumanFormat}
//                     formatBorrowStatus={formatBorrowStatus}
//                     handleDropdownChange={handleDropdownChange}
//                     isEditing={isEditing}
//                     modelNames={[]} // Add model names if necessary
//                     selectedIds={selectedIds} // Pass selectedIds if needed
//                     setSelectedIds={setSelectedIds} // Pass setSelectedIds if needed
//                 />
//             </div>
//         </div>
//     );
// }