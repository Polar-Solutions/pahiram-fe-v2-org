'use client';
import React, {useState} from 'react';
import ApproverReqTransCardHeader from '@/components/transaction/presentational/approver-transaction-header';
import {Badge} from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import TransactionDetails from '@/components/transaction/presentational/transaction-detail';
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";
import {useSearchParams} from 'next/navigation';
import {formatDateTimeToHumanFormat} from '@/helper/date-utilities';
import {useEditRequest} from '@/hooks/request/useEditRequest';
import {usePenalizedTransactionPagination, useSpecificPenalizedTransactionItems} from '@/core/data-access/requests';
import FinalizePenaltyButtonGroup from "@/components/penalties/presentational/penalty-approval-button-group";
import {getURLParams} from "@/helper/borrow/getURLParams";
import {IOfficeSpecificTransaction} from "@/lib/interfaces/get-specific-transaction-interface";
import {PenalizedSimpleTable} from "@/components/penalties/penalized-expanding-table/penalized-simple-table";
import {useForm} from "react-hook-form";
import {BorrowRequestSchema, TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FinalizePenaltySchema, TFinalizePenaltySchemaFormValues} from "@/lib/form-schemas/finalize-penalty-schema";
import {z} from "zod";

export default function PenalizedTransactionSpecific({transactionId}: { transactionId: string }) {
    const {page} = getURLParams();

    const {isLoading} = usePenalizedTransactionPagination(page);

    const {getRequestById} = useTransactionStore();
    const searchParams = useSearchParams();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const transaction = getRequestById("penalized-transaction", transactionId);

    const {data} = useSpecificPenalizedTransactionItems(transaction?.id || '');

    const itemGroups = data?.data;

    const {isEditing, setEditedDetails} = useEditRequest();

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

    const startDates = itemGroups ? Object.entries(itemGroups).map(([key, item]) => new Date((item as unknown as IOfficeSpecificTransaction).start_date)) : [];
    const dueDates = itemGroups ? Object.entries(itemGroups).map(([key, item]) => new Date((item as unknown as IOfficeSpecificTransaction).due_date)) : [];

    // Find the earliest start date and the latest due date
    const earliestStartDate = new Date(Math.min(...startDates.map(date => date.getTime())));
    const latestDueDate = new Date(Math.max(...dueDates.map(date => date.getTime())));

    const form = useForm<TFinalizePenaltySchemaFormValues>({
        resolver: zodResolver(FinalizePenaltySchema),
        defaultValues: {
            borrowed_item_id: "",
            penalty: 0,
            remarks_by_penalty_finalizer: "",
        },
        mode: "onChange",
    });

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
                {transaction?.penalized_transaction_status === 'PENDING_LENDING_SUPERVISOR_FINALIZATION' ? (
                    <FinalizePenaltyButtonGroup transactionId={transaction?.id}
                                                transactionStatus={transaction?.penalized_transaction_status}
                                                selectedIds={selectedIds} setSelectedIds={setSelectedIds}/>
                ) : null}


            </ApproverReqTransCardHeader>

            {/* Badges Section */}
            <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                    {transaction?.borrow_transaction_status
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
                transactionStatus={transaction?.borrow_transaction_status}
            />

            {/* Borrowing Details Component */}
            <div className="grid gap-4 md:grid-cols-2">
                <TransactionDetails transaction={transaction}/>

                {/* Borrowed Items Table Component */}
                <PenalizedSimpleTable
                    items={itemGroups}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
}
