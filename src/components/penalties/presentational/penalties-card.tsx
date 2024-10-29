'use client';
import { motion } from "framer-motion";
import React from 'react';
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import PenaltiesCardHeader from "./penalties-card-header";
import { useRouter } from 'nextjs-toploader/app';

export default function PenaltiesCard() {
    const router = useRouter();

    const transactions = [
        {
            "id": "48a484ca-4ce2-4146-be41-b52655447630",
            "borrower": "Jonathan Joseph Archog",
            "apc_id": "140169",
            "custom_transac_id": "-140169-102824-002638",
            "status": "APPROVED",
            "penalized_transaction_status": "PENDING_LENDING_SUPERVISOR_FINALIZATION",
            "purpose": "UPSKILLING",
            "user_defined_purpose": "gnmnbvbnm",
            "total_penalty": "100.00",
            "created_at": "2024-10-27T16:26:38.000000Z",
            "items": [
                {
                    "model_name": "MacBook Air M1",
                    "quantity": 1,
                    "start_date": "2024-10-30 10:00:00",
                    "due_date": "2024-11-01 15:30:00"
                },
                {
                    "model_name": "Arduino Uno R4 WiFi",
                    "quantity": 2,
                    "start_date": "2024-11-05 09:30:00",
                    "due_date": "2024-11-06 16:00:00"
                },
                {
                    "model_name": "Canon 200d",
                    "quantity": 1,
                    "start_date": "2024-10-30 09:30:00",
                    "due_date": "2024-11-01 16:00:00"
                }
            ]
        }
    ];

    const handleClickPenaltiesCard = () => {
        // Redirect to the penalties management page with custom_transac_id
        const customTransacId = transactions[0].custom_transac_id; // Get custom_transac_id
        router.push(`/office/finance-accounting-office/manage-penalties/${customTransacId}`);
    }
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="w-full h-full flex flex-col cursor-pointer group"
            onClick={handleClickPenaltiesCard} // Make card clickable
        >
            <Card className="w-full my-2">
                <CardHeader className="flex flex-col space-y-0 pb-2">
                    <PenaltiesCardHeader transaction={transactions[0]} /> 
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{transactions[0].penalized_transaction_status}</Badge>
                        <Badge variant="secondary">Status</Badge>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2">
                            <div className="flex items-center mb-2 mt-4">
                                <h3 className="font-semibold mr-2">Purpose</h3>
                                <Badge variant='outline'>
                                    {transactions[0].purpose}
                                </Badge>
                            </div>
                            <div className='text-balance mt-2'>
                                <div className="overflow-hidden text-sm">
                                    <p>
                                        {transactions[0].user_defined_purpose}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center">
                                <h3 className="font-semibold mr-2">Total Penalty</h3>
                                <Badge variant="secondary">
                                    {transactions[0].total_penalty} PHP
                                </Badge>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Model Name</TableHead>
                                        <TableHead>Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions[0].items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.model_name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <p className='text-muted-foreground max-w-lg'>
                            <div>
                                Total Borrowing Period:
                                {" "}
                                {new Date(transactions[0].items[0].start_date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })} 
                                {" "}
                                to 
                                {" "}
                                {new Date(transactions[0].items[0].due_date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })}
                            </div>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
