import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import {REQUEST_TRANSACTION_PROGRESS} from "@/CONSTANTS/REQUEST_TRANSACTION_STATUSES_CONSTANTS";

interface TransactionProgressProps {
    transactionStatus: string | undefined; // The current status of the transaction
}

// Type for progress statuses
interface TransactionProgressType {
    progress: string;
    statuses: string[] | undefined;
}

const TransactionProgress: React.FC<TransactionProgressProps> = ({ transactionStatus }) => {
    // Find the progress index based on the current status
    const progressIndex = REQUEST_TRANSACTION_PROGRESS.findIndex((progress: TransactionProgressType) =>
        progress?.statuses?.includes(transactionStatus || '')
    );

    // Calculate the percentage progress
    const progressValue = ((progressIndex + 1) / (REQUEST_TRANSACTION_PROGRESS.length + 1)) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction Status History</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Dynamic progress bar */}
                <Progress value={progressValue} className="w-full" />

                {/* Display the progress steps including "Submitted" */}
                <div className="flex justify-between mt-2 text-sm">
                    <span>Submitted</span>
                    {REQUEST_TRANSACTION_PROGRESS.map((progress: TransactionProgressType, index: number) => (
                        <span key={index}>{progress.progress}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionProgress;
