import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ITransactionRequest } from "@/lib/interfaces/get-office-transaction-interface";
import { Textarea } from "@/components/ui/textarea";

interface BorrowingDetailsProps {
  transaction: ITransactionRequest | undefined;
}

const TransactionDetails: React.FC<BorrowingDetailsProps> = ({
  transaction,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrowing Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Endorser</label>
          <Input
            value={
              transaction?.endorsed_by
                ? transaction.endorsed_by.full_name
                : "No Endorser"
            }
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium">Purpose</label>
          <Input
            value={
              transaction?.purpose
                ? transaction.purpose
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char: string) => char.toUpperCase())
                : "N/A"
            }
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium">Specify Purpose</label>
          <Textarea value={transaction?.user_defined_purpose} readOnly />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
