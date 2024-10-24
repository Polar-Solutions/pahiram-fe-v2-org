import {ArrowLeft, Mail} from "lucide-react";
import React from "react";
import {useRouter} from 'nextjs-toploader/app';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

interface EndorserReqTransCardHeaderProps {
    borrowerName: string | undefined;
    borrowerId: string | undefined;
    submissionDate: string | undefined;
    transactionId: string | undefined;
    withBackArrow?: boolean;
    id: string | undefined;
    children: React.ReactNode;
}

export default function EndorserReqTransCardHeader({
                                                       borrowerName,
                                                       borrowerId,
                                                       submissionDate,
                                                       transactionId,
                                                       withBackArrow = false,
                                                       id,
                                                       children
                                                   }: EndorserReqTransCardHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {withBackArrow && (
                    <Button
                        onClick={() => {
                            router.back();
                        }}
                        variant="ghost"
                        size="icon"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                )}
                <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={borrowerName}/>
                    <AvatarFallback>{borrowerName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold">{borrowerName}</h2>
                        <Badge variant="secondary" className="ml-2">{borrowerId}</Badge>
                        {/*TODO: Make the mail onClick*/}
                        <Mail className="h-4 w-4 ml-2 text-blue-500"/>
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted {submissionDate}</p>
                    <p className="text-sm text-muted-foreground">{transactionId}</p>
                </div>
            </div>
            {children}
        </div>
    );
}
