'use client';
import React from 'react';
import EndorserReqTransCardHeader from "@/components/endorsement/presentational/endorsement-transaction-header";
import EndorserApprovalButtonGroup from "@/components/endorsement/presentational/endorser-approval-button-group";
import {Badge} from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import BorrowingDetails from "@/components/endorsement/presentational/borrowing-details";
import BorrowedItemsTable from "@/components/endorsement/presentational/borrowing-items-table";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";
import {formatBorrowStatus} from "@/helper/formatting-utilities";
import {useEndorsements} from "@/hooks/endorsement/useEndorsements";
import {getURLParams} from "@/helper/borrow/getURLParams";

const EndorsementTransactionSpecific = ({
                                            transactionId
                                        }:
                                            { transactionId: string }
) => {
    const {page} = getURLParams();
    // WARNING!!! This is a temporary fix to get the endorsement transactions from the API
    const {endorsementTransactions} = useEndorsements(page);

    const {getRequestById} = useTransactionStore();

    const endorsement = getRequestById("endorsement", transactionId);

    const {formattedStatus, badgeClass} = formatBorrowStatus(endorsement?.status);

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
                <EndorserApprovalButtonGroup endorsementId={endorsement?.id} endorsementStatus={endorsement?.status}/>
            </EndorserReqTransCardHeader>

            {/* Badges Section */}
            <div className="flex items-center space-x-2">
                <Badge variant="secondary">DEPARTMENT</Badge>
                <Badge variant="secondary">{endorsement?.items.length} items</Badge>
                <Badge className={badgeClass}>{formattedStatus}</Badge>
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
