"use client";

import ActionButton from "@/components/common/action-button/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";
import {handleEndorsementApproval} from "@/components/endorsement/handle-endorsement-approval";
import {useAction} from "next-safe-action/hooks";
import {approveEndorsementAction} from "@/core/actions/approve-endorsement";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";
import {Spinner} from "@/components/common/spinner"

export default function EndorserApprovalButtonGroup({endorsementId, endorsementStatus}: {
    endorsementId: string | undefined,
    endorsementStatus: string | undefined
}) {

    const {executeAsync, isExecuting} = useAction(approveEndorsementAction);

    const {clearAllRequests} = useTransactionStore();

    return (
        <div className="flex items-center space-x-2">
            {endorsementStatus === "PENDING_ENDORSER_APPROVAL" && (
                <>
                    {isExecuting && <Spinner className="mr-2 h-4 w-4 animate-spin"/>}
                    <ActionButton
                        approveText="Approve"
                        declineText="Decline"
                        onApprove={() => handleEndorsementApproval(endorsementId, executeAsync, () => clearAllRequests("endorsement"), true)}
                        onDecline={() => handleEndorsementApproval(endorsementId, executeAsync, () => clearAllRequests("endorsement"), false)}
                        modalTitleApprove="Approve Endorsement"
                        modalTitleDecline="Decline Endorsement"
                        modalDescApprove="Are you sure you want to approve this endorsement?"
                        modalDescDecline="Are you sure you want to decline this endorsement?"
                    />
                </>
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