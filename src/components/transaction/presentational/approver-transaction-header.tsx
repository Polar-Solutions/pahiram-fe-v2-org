import { ArrowLeft, Mail, MoreHorizontal } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ActionButton from "@/components/common/action-button/button";

interface ApproverReqTransCardHeaderProps {
  borrowerName: string;
  borrowerId: string;
  submissionDate: string;
  transactionId: string;
  isSpecific?: boolean;
  id: string;
}

export default function ApproverReqTransCardHeader({
  borrowerName,
  borrowerId,
  submissionDate,
  transactionId,
  isSpecific = false,
}: ApproverReqTransCardHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {isSpecific && (
          <Button
            onClick={() => {
              router.back();
            }}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={borrowerName} />
          <AvatarFallback>{borrowerName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <h2 className="text-lg font-bold">{borrowerName}</h2>
            <Badge variant="secondary" className="ml-2">{borrowerId}</Badge>
            <Mail className="h-4 w-4 ml-2 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground">Submitted {submissionDate}</p>
          <p className="text-sm text-muted-foreground">{transactionId}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <ActionButton
          approveText="Approve"
          declineText="Decline"
          onApprove={async () => {
            return new Promise((resolve, reject) => {
              try {
                // Simulate an asynchronous operation (like an API call)
                setTimeout(() => {
                  console.log("Approval process completed.");
                }, 1000); // Simulate a delay of 1 second
              } catch (error) {
                reject("Approval failed");
              }
            });
          }}
          onDecline={async () => {
            return new Promise((resolve, reject) => {
              try {
                // Simulate an asynchronous operation (like an API call)
                setTimeout(() => {
                  console.log("Approval process completed.");
                }, 1000); // Simulate a delay of 1 second
              } catch (error) {
                reject("Approval failed");
              }
            });
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Copy ID</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
