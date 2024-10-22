import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";

interface BorrowingDetailsProps {
    endorsement: ITransactionRequest | undefined;
}

const BorrowingDetails: React.FC<BorrowingDetailsProps> = ({ endorsement }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Borrowing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Endorser</label>
                    <Input value={endorsement?.endorsed_by.full_name} readOnly />
                </div>
                <div>
                    <label className="text-sm font-medium">Purpose</label>
                    <Input value={endorsement?.purpose} readOnly />
                </div>
                <div>
                    <label className="text-sm font-medium">Specify Purpose</label>
                    <Input value={endorsement?.user_defined_purpose} readOnly />
                </div>
            </CardContent>
        </Card>
    );
};

export default BorrowingDetails;
