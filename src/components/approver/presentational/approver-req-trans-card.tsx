'use client';
import {Clock} from "lucide-react"
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import ApproverReqTransCardHeader from "@/components/approver/presentational/approver-req-trans-card-header";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useState} from "react";


export default function ApproverReqTransCard() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedItems, setIsExpandedItems] = useState(false);

    // Hardcoded example data
    const fullText = "We are required to shoot a video in PROFETH. Lorem ipsum dolor sit amen wiz cham po rah dou. Jumbo. We are required to shoot a video in PROFETH. Lorem ipsum dolor sit amen wiz cham po rah dou. Jumbo.";

    const visibleRowsCount = 3;

    const endorsement = {
        apc_id: "APC12345",
        borrower: "John Doe",
        created_at: "2024-09-11T10:00:00Z",
        custom_transac_id: "TX123456",
        user_defined_purpose: "We are required to shoot a video in PROFETH. This is for our academic project where we need to demonstrate certain skills in filming and editing.",
        purpose: "academic_related",
    };

    // Hardcoded item data
    const items = [
        {model_name: "Arduino R4 Board", quantity: 1},
        {model_name: "Laptop", quantity: 1},
        {model_name: "Camera", quantity: 1},
        {model_name: "Microphone", quantity: 1}
    ];

    return (
        <motion.div
            whileHover={{y: -5}}
            className="w-full h-full flex flex-col cursor-pointer group"
        >
            <Card
                className="w-full"

            >
                <CardHeader className="flex flex-col space-y-0 pb-2">
                    <ApproverReqTransCardHeader/>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">DEPARTMENT</Badge>
                        <Badge variant="secondary">3 items</Badge>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2">
                            <h3 className="font-semibold mb-1">Purpose</h3>
                            <Badge variant='outline'>
                                {endorsement.purpose
                                    ? endorsement.purpose
                                        .toLowerCase() // Convert to lowercase
                                        .replace(/_/g, ' ') // Replace underscores with spaces
                                        .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
                                    : "N/A"
                                }
                            </Badge>
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
                                        onClick={() => setIsExpandedItems(!isExpandedItems)}
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
                        Total Borrowing Period: September 11, 2024 to September 19, 2024
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}