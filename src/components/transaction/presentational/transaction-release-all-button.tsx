"use client";

import ActionButton from "@/components/common/action-button/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";
import { handleTransactionRelease } from "@/components/transaction/handle-transaction-approval";
import {useAction} from "next-safe-action/hooks";
import { releaseTransactionAction } from "@/core/actions/release-transaction";

export default function OfficerReleaseAllButton({transactionId, transactionStatus}: { transactionId: string | undefined, transactionStatus: string | undefined }) {

    const {executeAsync, isExecuting} = useAction(releaseTransactionAction);

    return (
        <div className="flex items-center space-x-2">
            {/* Show buttons only if transactionStatus is PENDING_BORROWING_APPROVAL */}
            {transactionStatus === "APPROVED" || transactionStatus === "ON_GOING" && (
                <ActionButton
                    approveText="Release all"
                    declineText="Withold all"
                    onApprove={() => handleTransactionRelease(transactionId, executeAsync, true)}
                    onDecline={() => handleTransactionRelease(transactionId, executeAsync, false)}
                    modalTitleApprove="Release Transaction"
                    modalTitleDecline="Withold Transaction"
                    modalDescApprove="Are you sure you want to release this transaction?"
                    modalDescDecline="Are you sure you want to withold this transaction?"
                />
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Contact Borrower</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
