'use client';
import React from 'react';
import EndorserReqTransCardHeader from "@/components/endorsement/presentational/endorsement-transaction-header";
import EndorserApprovalButtonGroup from "@/components/endorsement/presentational/endorser-approval-button-group";
import {Badge} from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import BorrowingDetails from "@/components/endorsement/presentational/borrowing-details";
import BorrowedItemsTable from "@/components/endorsement/presentational/borrowing-items-table";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";

const EndorsementTransactionSpecific = ({
                                            transactionId
                                        }:
                                            { transactionId: string }
) => {
    const {getRequestById} = useTransactionStore();

    const endorsement = getRequestById("endorsement", transactionId);

    return (
        <div className="container mx-auto p-4 space-y-4">
            {/* Header Component */}
            <EndorserReqTransCardHeader
                withBackArrow={true}
                borrowerName={endorsement?.borrower}
                borrowerId={endorsement?.apc_id}
                submissionDate={endorsement?.created_at}
                transactionId={endorsement?.custom_transac_id}
                id={endorsement?.id}
            >
                <EndorserApprovalButtonGroup endorsementId={endorsement?.id}/>
            </EndorserReqTransCardHeader>

            {/* Badges Section */}
            <div className="flex items-center space-x-2">
                <Badge variant="secondary">DEPARTMENT</Badge>
                <Badge variant="secondary">{endorsement?.items.length} items</Badge>
            </div>

            {/* Transaction Period */}
            <p className="text-sm text-muted-foreground">{endorsement?.custom_transac_id}</p>
            <p className="text-sm">
                Total Borrowing Period: September 11, 2024 to September 19, 2024
            </p>

            {/* Transaction Progress Component */}
            <TransactionProgress
                transactionStatus={endorsement?.status}
            />

            {/* Borrowing Details Component */}
            <div className="grid gap-4 md:grid-cols-2">
                <BorrowingDetails endorsement={endorsement}/>

                {/* Borrowed Items Table Component */}
                <BorrowedItemsTable items={endorsement?.items}/>
            </div>
        </div>
    );
};

export default EndorsementTransactionSpecific;
