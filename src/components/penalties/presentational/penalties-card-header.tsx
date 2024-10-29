'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ActionButton from "@/components/common/action-button/button";
import { ArrowLeft, Mail } from "lucide-react";
import React from "react";
import { useRouter } from 'nextjs-toploader/app'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


interface Transaction {
    borrower: string;
    apc_id: string;
    created_at: string;
    custom_transac_id: string;
}

export default function PenaltiesCardHeader({ transaction }: { transaction: Transaction }) {
    const router = useRouter();

    const handleBack = () => {
        // Navigate back or to a specific route
        router.back(); // Example: Navigate back to the previous page
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <Button
                        onClick={() => {
                            router.back();
                        }}
                        variant="ghost"
                        size="icon"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="C" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold">{transaction.borrower}</h2> {/* Use borrower name from the transaction */}
                        <Badge variant="secondary" className="ml-2">{transaction.apc_id}</Badge> {/* Use apc_id from the transaction */}
                        <Mail className="h-4 w-4 ml-2 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted {new Date(transaction.created_at).toLocaleDateString()}</p> {/* Format date */}
                    <p className="text-sm text-muted-foreground">{transaction.custom_transac_id}</p> {/* Use custom_transac_id */}
                </div>
            </div>
 {/* Optional Back button */}
        </div>
    );
}
