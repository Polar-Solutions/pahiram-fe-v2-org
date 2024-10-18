"use client";

import ActionButton from "@/components/common/action-button/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";
import { handleTransactionApproval } from "@/components/transaction/handle-transaction-approval";
import {useAction} from "next-safe-action/hooks";
import {approveEndorsementAction} from "@/core/actions/approve-endorsement";

export default function OfficerApprovalButtonGroup({transactionId}: { transactionId: string | undefined }) {

    const {executeAsync, isExecuting} = useAction(approveEndorsementAction);

    return (
        <div className="flex items-center space-x-2">
            <ActionButton
                approveText="Approve"
                declineText="Decline"
                onApprove={() => handleTransactionApproval(transactionId, executeAsync, true)}
                onDecline={() => handleTransactionApproval(transactionId, executeAsync, false)}
                modalTitleApprove="Approve Transaction"
                modalTitleDecline="Decline Transaction"
                modalDescApprove="Are you sure you want to approve this transaction?"
                modalDescDecline="Are you sure you want to decline this transaction?"
            />
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