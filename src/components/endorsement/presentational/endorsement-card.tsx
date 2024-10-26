'use client';
import {motion} from "framer-motion";
import React, {useState} from 'react';
import {Clock} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ITransactionRequest} from '@/lib/interfaces/get-office-transaction-interface';
import {useRouter} from 'nextjs-toploader/app';

import EndorserReqTransCardHeader from "@/components/endorsement/presentational/endorsement-transaction-header";
import EndorserApprovalButtonGroup from "@/components/endorsement/presentational/endorser-approval-button-group";
import {REQUEST_TRANSACTION_STATUSES} from "@/CONSTANTS/REQUEST_TRANSACTION_STATUSES_CONSTANTS";

interface TransactionCardProps {
    endorsement: ITransactionRequest;
}

export default function EndorsementCard({endorsement}: TransactionCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedItems, setIsExpandedItems] = useState(false);
    const fullText = endorsement.user_defined_purpose || "N/A";
    const truncatedText = fullText.slice(0, 100);
    const router = useRouter();

    const {items, borrower, created_at, custom_transac_id} = endorsement;


    // Number of rows to show when collapsed
    const visibleRowsCount = 3;

    const handleClickEndorsementCard = () => {
        router.push(`/borrow/manage-endorsements/${endorsement.custom_transac_id}`);
    }

    return (
        <motion.div
            whileHover={{y: -5}}
            className="w-full h-full flex flex-col cursor-pointer group"
        >
            <Card
                className="w-full my-2"
                onClick={handleClickEndorsementCard}
            >
                <CardHeader className="flex flex-col space-y-0 pb-2">
                    <EndorserReqTransCardHeader
                        borrowerName={borrower}
                        borrowerId={endorsement.apc_id}
                        submissionDate={new Date(created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        transactionId={custom_transac_id}
                        id={endorsement.id}
                    >
                        {/* Prevent the approval button group from triggering the card's click event */}
                        {endorsement.status === REQUEST_TRANSACTION_STATUSES.PENDING_ENDORSER_APPROVAL &&
                        <div onClick={(e) => e.stopPropagation()}>
                            <EndorserApprovalButtonGroup endorsementId={endorsement.id} endorsementStatus={endorsement.status}/>
                        </div>
                        }
                    </EndorserReqTransCardHeader>
                </CardHeader>

                <CardContent>
                    {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
                        <div className="flex items-center gap-2 mb-4" key={index}>
                            <Badge variant="secondary">{item.quantity} item</Badge>
                        </div>
                    ))}
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2">
                            <div className="flex items-center mb-1">
                                <h3 className="font-semibold mr-2">Purpose</h3> {/* Added margin-right for spacing */}
                                <Badge variant='outline'>
                                    {endorsement.purpose
                                        ? endorsement.purpose
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


                        <div className="w-full lg:w-1/2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Model Name</TableHead>
                                        <TableHead>Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.model_name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {items.length > visibleRowsCount && (
                                <div className="text-center mt-4">
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ensure it doesn't trigger the card's onClick
                                            setIsExpandedItems(!isExpandedItems);
                                        }}
                                        variant="outline"
                                        className="text-blue-500"
                                    >
                                        {isExpandedItems ? "Collapse" : "Expand"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4"/>
                        <p className='text-muted-foreground max-w-lg'>
                            {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
                                <div key={index}>
                                    Total Borrowing Period:
                                    {new Date(item.start_date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    }) + " "}
                                    to
                                    {" "}
                                    {new Date(item.due_date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })}
                                </div>
                            ))}
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
