'use client';
import React from 'react';
import {useRouter} from "next/navigation";

import {ArrowLeft, Mail} from "lucide-react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge";
import {Button} from '@/components/ui/button';
import {Progress} from "@/components/ui/progress";

export default function ApproverSpecificReqTrans() {
    const router = useRouter();
    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => {
                        router.back();
                    }} variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kathryn Ann Icuspit"/>
                        <AvatarFallback>KI</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold">KATHRYN ANN ICUSPIT 2021-140617</h1>
                        <p className="text-sm text-muted-foreground">Submitted September 14, 2024</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4"/>
                    </Button>
                    <Button>Approve</Button>
                    <Button variant="outline">Decline</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                ...
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Copy ID</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Badge variant="secondary">DEPARTMENT</Badge>
                <Badge variant="secondary">3 items</Badge>
            </div>
            <p className="text-sm text-muted-foreground">ITRO-140966-090324-083015</p>
            <p className="text-sm">
                Total Borrowing Period: September 11, 2024 to September 19, 2024
            </p>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Status History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={33} className="w-full"/>
                    <div className="flex justify-between mt-2 text-sm">
                        <span>Submitted</span>
                        <span>Approved</span>
                        <span>Borrowed</span>
                        <span>Returned</span>
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Borrowing details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Endorser</label>
                            <Input value="Mrs. Endorser Senpai" readOnly/>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Purpose</label>
                            <Input value="Academic-related" readOnly/>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Specify purpose</label>
                            <Input
                                value="We are required to shoot a video in our subject PROFETH."
                                readOnly
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Borrowed items</CardTitle>
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
                                {[
                                    "Arduino R4 Board",
                                    "Laptop",
                                    "Charger",
                                    "RJ45 Wire",
                                    "Chair",
                                    "Table",
                                ].map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item}</TableCell>
                                        <TableCell>{index === 3 ? 2 : index === 4 ? 4 : index === 5 ? 2 : 1}</TableCell>
                                        <TableCell>Aug 12 2024 5:00 am - Aug 13 2024 12:00 pm</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Pending</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

        </div>

    );
}