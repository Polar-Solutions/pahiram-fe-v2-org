'use client';
import {motion} from "framer-motion";
import React, {useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {ITransactionRequest} from '@/lib/interfaces/get-office-transaction-interface';
import {useRouter} from 'nextjs-toploader/app';

interface TransactionCardProps {
    transaction: ITransactionRequest;
}

export default function PenalizedTransactionCard({transaction}: TransactionCardProps) {
    const fullText = transaction.user_defined_purpose || "N/A";
    const router = useRouter();

    const handleClickEndorsementCard = () => {
        router.push(`/office/lending-offices/manage-penalties/${transaction.custom_transac_id}`);
    }

    const Avatar = ({name}: { name: string }) => {
        const initials = name.charAt(0).toUpperCase();
        return (
            <div
                className="w-10 h-10 bg-primary text-zinc-950 rounded-full flex items-center justify-center text-xl font-medium">
                {initials}
            </div>
        );
    };

    return (
        <motion.div
            whileHover={{y: -5}}
            className="w-full h-full flex flex-col cursor-pointer group"
        >
            <Card className="w-full p-3"
                  onClick={handleClickEndorsementCard}
            >
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar name={transaction.borrower}/>
                            <div>
                                <p className="text-sm font-medium">{transaction.borrower}</p>
                                <p className="text-sm">{transaction.custom_transac_id}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                                {transaction?.penalized_transaction_status
                                    .toLowerCase()         // Convert to lowercase
                                    .split('_')            // Split by underscore
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                    .join(' ')
                                }
                            </Badge>

                        </div>
                    </div>
                    <div className="mt-2 text-sm">
                        {transaction?.endorsed_by ?
                            <>
                                <span>Endorsed by {transaction.endorsed_by?.full_name || 'N/A'} ({transaction.endorsed_by?.apc_id || 'N/A'})</span>
                            </>
                            : <span>No endorser tagged</span>
                        }
                        <span className="mx-2">•</span>
                        <span>{new Date(transaction.created_at).toLocaleString()}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="flex items-center mb-2 mt-4">
                                <h3 className="font-semibold mr-2">Purpose</h3> {/* Added margin-right for spacing */}
                                <Badge variant='outline'>
                                    {transaction.purpose
                                        ? transaction.purpose
                                            .toLowerCase() // Convert to lowercase
                                            .replace(/_/g, ' ') // Replace underscores with spaces
                                            .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
                                        : "N/A"
                                    }
                                </Badge>
                            </div>
                            <div className='text-balance mt-2'>
                                <div className="overflow-hidden text-sm">
                                    <p>
                                        {fullText}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Total Penalty: P {transaction.total_penalty}</h1>
                    </div>
                    {transaction.remarks_by_return_facilitator && (
                        <p className="mt-2 text-xs text-zinc-400">Remarks: {transaction.remarks_by_return_facilitator}</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
