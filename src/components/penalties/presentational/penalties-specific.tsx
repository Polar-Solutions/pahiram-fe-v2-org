import React from 'react';
import PenaltiesCardHeader from './penalties-card-header';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import PenaltiesDetail from './penalties-detail';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample transactions data (replace this with actual data if available)
const transactions = [
    {
        id: "48a484ca-4ce2-4146-be41-b52655447630",
        borrower: "Jonathan Joseph Archog",
        apc_id: "140169",
        custom_transac_id: "-140169-102824-002638",
        status: "APPROVED",
        created_at: "2024-10-27T16:26:38.000000Z",
        items: [
            { model_name: "MacBook Air M1", quantity: 1 },
            { model_name: "Arduino Uno R4 WiFi", quantity: 2 },
            { model_name: "Canon 200d", quantity: 1 }
        ]
    }
];

export default function PenaltiesSpecific() {
    const transaction = transactions[0]; // Use the first transaction for demonstration

    return (
        <div className="container mx-auto p-4 space-y-4">
            <PenaltiesCardHeader transaction={transaction} /> {/* Pass transaction data to the header */}

            <div className="flex items-center space-x-2">
                <Badge variant="secondary">Penalty</Badge>
                <Badge variant="secondary">Status</Badge>
            </div>

            <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <p className='text-muted-foreground max-w-lg'>
                    <div>
                        Total Borrowing Period:
                        {" "}
                        {new Date(transaction.created_at).toLocaleDateString()} {/* Example date */}
                        {" "}
                        to 
                        {" "}
                        {new Date(new Date(transaction.created_at).setFullYear(new Date(transaction.created_at).getFullYear() + 1)).toLocaleDateString()} {/* 1 year later */}
                    </div>
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <PenaltiesDetail /> {/* Ensure this component is implemented correctly */}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Model Name</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transaction.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.model_name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
