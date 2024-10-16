import {ArrowLeft, Mail, MoreHorizontal} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import ActionButton from "@/components/common/action-button/button";

export default function ApproverReqTransCardHeader({isSpecific = false}: { isSpecific?: boolean }) {
    const router = useRouter();

    // Click handler to navigate to a specific route
    const handleClick = () => {
        router.push(`/borrow/manage-endorsements/specific-request-transaction/1`);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {isSpecific && <Button onClick={() => {
                    router.back();
                }} variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4"/>
                </Button>}
                {/* Make this section clickable */}
                <div className="flex items-center space-x-4 cursor-pointer" onClick={handleClick}>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kathryn Ann Icuspit"/>
                        <AvatarFallback>KI</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center">
                            <h2 className="text-lg font-bold">KATHRYN ANN ICUSPIT</h2>
                            <Badge variant="secondary" className="ml-2">2021-140617</Badge>
                            <Mail className="h-4 w-4 ml-2 text-blue-500"/>
                        </div>
                        <p className="text-sm text-muted-foreground">Submitted September 14, 2024</p>
                        <p className="text-sm text-muted-foreground">ITRO-140966-090324-083015</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <ActionButton
                    approveText="Approve"
                    declineText="Decline"
                    onApprove={() => console.log('Approve')}
                    onDecline={() => console.log('Decline')}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Copy ID</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
