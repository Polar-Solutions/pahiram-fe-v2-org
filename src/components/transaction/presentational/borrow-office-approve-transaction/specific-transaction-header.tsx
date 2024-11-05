import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionButton from "@/components/common/action-button/button";
import { ArrowLeft, Mail } from "lucide-react";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type OfficerReqTransCardHeaderProps = {
  transaction?: {
    id: string | undefined;
    borrower: string | undefined;
    apc_id: string | undefined;
    created_at: string | undefined | null;
    custom_transac_id: string | undefined;
    borrow_transaction_status: string | undefined;
    endorsed_by?: {
      apc_id: string | undefined;
      full_name: string | undefined;
    };
    purpose: string | undefined;
    user_defined_purpose: string | undefined;
    items: Array<{
      quantity: number;
      model_name: string;
      start_date: string;
    }>;
  };
  withBackArrow?: boolean;
};

export default function SpecificTransactionHeader({
  transaction,
  withBackArrow,
}: OfficerReqTransCardHeaderProps) {
  const router = useRouter();

  if (!transaction) {
    return <div>Go Back</div>;
  }

  const formattedDate = transaction?.created_at
    ? format(new Date(transaction?.created_at), "MMMM d, yyyy, h:mm a")
    : "N/A";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-4">
        {withBackArrow && (
          <Button
            onClick={() => {
              router.back();
            }}
            variant="ghost"
            size="icon"
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt={transaction?.borrower}
          />
          <AvatarFallback>{transaction?.borrower?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <h2 className="text-lg font-bold">{transaction?.borrower}</h2>
            <Badge variant="secondary" className="ml-2">
              {transaction?.apc_id}
            </Badge>
            <Mail className="h-4 w-4 ml-2 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            Submitted {formattedDate}
          </p>
          <p className="text-sm text-muted-foreground">
            {transaction?.custom_transac_id}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Badge variant="secondary">
          {transaction?.borrow_transaction_status
            ?.toLowerCase() // Convert to lowercase
            ?.split("_") // Split by underscore
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            ?.join(" ")}
        </Badge>

        <Badge variant="secondary">
          {transaction?.items.reduce(
            (total, item) => total + item?.quantity,
            0
          )}{" "}
          items
        </Badge>
      </div>
    </div>
  );
}
