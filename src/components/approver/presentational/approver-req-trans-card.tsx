'use client';
import {Clock} from "lucide-react"
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import ApproverReqTransCardHeader from "@/components/approver/presentational/approver-req-trans-card-header";


export default function ApproverReqTransCard() {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{y: -5}}
            className="w-full h-full flex flex-col cursor-pointer group"
        >
            <Card
                onClick={() => {
                    router.push(`/borrow/manage-endorsements/specific-request-transaction/1`);
                }}
                className="w-full"
            >
                <CardHeader className="flex flex-col space-y-0 pb-2">
                    <ApproverReqTransCardHeader />
                </CardHeader>

                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">DEPARTMENT</Badge>
                        <Badge variant="secondary">3 items</Badge>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-1">Purpose</h3>
                            <Badge variant="outline" className="mb-2">Academic-related</Badge>
                            <p className="text-sm text-muted-foreground">
                                We are required to shoot a video in PROFETH. Lorem ipsum dolor sit amen wiz cham po rah
                                dou. Jumbo. We are required to shoot a video in PROFETH. Lorem ipsum dolor sit amen wiz
                                cham po rah dou. Jum...
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Items</h3>
                            <ul className="space-y-2">
                                <li className="flex gap-4 items-center">
                                    <span>1</span>
                                    <span>Arduino R4 Board</span>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <span>1</span>
                                    <span>Laptop</span>
                                </li>
                            </ul>
                            <Button variant="link" className="p-0 h-auto mt-2">See more</Button>
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