"use client";
import React, { useState, useEffect } from "react";
import ApproverReqTransCardHeader from "@/components/transaction/presentational/approver-transaction-header";
import { Badge } from "@/components/ui/badge";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import TransactionDetails from "@/components/transaction/presentational/transaction-detail";
import { useTransactionStore } from "@/hooks/stores/useTransactionStore";
import { useSearchParams } from "next/navigation";
import { formatDateTimeToHumanFormat } from "@/helper/date-utilities";
import { useSpecificTransactionItems } from "@/core/data-access/requests";
import { IOfficeSpecificTransaction } from "@/lib/interfaces/get-specific-transaction-interface";
import { useTransactionData } from "@/hooks/transaction/useTransaction";
import { SimpleTable } from "./simple-table";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReturnItemSchema,
  TReturnItemFormValues,
} from "@/lib/form-schemas/return-request-form-schema";
import ReturnModal from "./return-modal";

export default function ReturnTransacSpecific({
  transactionId,
}: {
  transactionId: string;
}) {
  const { getRequestById } = useTransactionStore();
  const searchParams = useSearchParams();
  const { setTransactionId } = useTransactionData();

  const transaction = getRequestById("transaction", transactionId);

  const { data } = useSpecificTransactionItems(transaction?.id || "");

  const items: IOfficeSpecificTransaction[] = data?.data;

  console.log("IIITEEEMSS", items);

  useEffect(() => {
    setTransactionId(transaction?.id || "");
  }, [transaction?.id]);

  const startDates = items
    ? Object.entries(items).map(
        ([key, item]) =>
          new Date((item as IOfficeSpecificTransaction).start_date)
      )
    : [];
  const dueDates = items
    ? Object.entries(items).map(
        ([key, item]) => new Date((item as IOfficeSpecificTransaction).due_date)
      )
    : [];

  // Calculate earliest and latest dates with proper null checks
  const earliestStartDate = startDates.length
    ? new Date(Math.min(...startDates.map((date) => date.getTime())))
    : null;
  const latestDueDate = dueDates.length
    ? new Date(Math.max(...dueDates.map((date) => date.getTime())))
    : null;

  const form = useForm<TReturnItemFormValues>({
    resolver: zodResolver(ReturnItemSchema),
    defaultValues: { items: [] },
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSelect = (item: any, checked: boolean) => {
    // Get the current values from the form state, specifying the key
    const currentValues = form.getValues("items") || []; // Get the current items or default to empty array

    if (checked) {
      // Add the selected item to the array
      const updatedValues = [...currentValues, item];
      // Update the form state with the new array, using the key 'items'
      form.setValue("items", updatedValues);
    } else {
      // If unchecked, remove the item from the array
      const updatedValues = currentValues.filter(
        (i) => i.borrowed_item_id !== item.borrowed_item_id // Assuming borrowed_item_id is a unique identifier
      );
      // Update the form state with the new array, using the key 'items'
      form.setValue("items", updatedValues);
    }
  };

  return (
    <Form {...form}>
      <div className="container mx-auto p-4 space-y-4">
        {/* Header Component */}
        <ApproverReqTransCardHeader
          withBackArrow={true}
          borrowerName={transaction?.borrower}
          borrowerId={transaction?.apc_id}
          submissionDate={
            transaction?.created_at
              ? formatDateTimeToHumanFormat(transaction.created_at)
              : "N/A"
          }
          transactionId={transaction?.custom_transac_id}
          id={transaction?.id}
        >
          <ReturnModal />
        </ApproverReqTransCardHeader>

        {/* Badges Section */}
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {transaction?.status
              .toLowerCase() // Convert to lowercase
              .split("_") // Split by underscore
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
              .join(" ")}
          </Badge>

          <Badge variant="secondary">
            {transaction?.items.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            items
          </Badge>
        </div>

        <div>
          <p className="text-sm">
            {earliestStartDate
              ? earliestStartDate.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              : "N/A"}{" "}
            to{" "}
            {latestDueDate
              ? latestDueDate.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              : "N/A"}
          </p>
        </div>

        {/* Transaction Progress Component */}
        <TransactionProgress transactionStatus={transaction?.status} />

        {/* Borrowing Details Component */}
        <div className="grid gap-4 md:grid-cols-2">
          <TransactionDetails transaction={transaction} />

          {/* Borrowed Items Table Component */}
          <SimpleTable items={items} onSelect={onSelect} />
        </div>
      </div>
    </Form>
  );
}
