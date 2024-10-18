import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {IItemTransaction} from "@/lib/interfaces/get-office-transaction-interface";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface BorrowedItemsTableProps {
    items: IItemTransaction[] | undefined;
}

const BorrowedItemsTable: React.FC<BorrowedItemsTableProps> = ({ items }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Borrowed Items</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Borrowing Period</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.model_name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.start_date} - {item.due_date}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Pending</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default BorrowedItemsTable;
