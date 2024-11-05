"use client";
import React, { useEffect } from "react";
import TransactionProgress from "@/components/endorsement/presentational/transaction-progress";
import TransactionDetails from "@/components/transaction/presentational/transaction-detail";
import { useTransactionStore } from "@/hooks/stores/useTransactionStore";
import { useSpecificTransactionItems } from "@/core/data-access/requests";
import {
  IBorrowedItemDetail,
  IOfficeSpecificTransaction,
} from "@/lib/interfaces/get-specific-transaction-interface";
import { useTransactionData } from "@/hooks/transaction/useTransaction";
import { SimpleTable } from "./simple-table";
import { useForm } from "react-hook-form";
import { ApproveDisapproveButtons } from "../button-group/approve-disapprove-buttons";
import { REQUEST_TRANSACTION_STATUSES } from "@/CONSTANTS/REQUEST_TRANSACTION_STATUSES_CONSTANTS";
import { onSelectApproveAndRelease } from "../../on-select-table-row";
import { ReleaseWithholdButtons } from "../button-group/release-withhold-button";
import { CornerDownLeft } from "lucide-react";
import { ReturnItemModal } from "./return-item-modal";
import {
  ParentSchema,
  TReturnItemSchemaArray,
} from "@/lib/form-schemas/return-request-form-schema";
import { Form } from "@/components/ui/form";
import SpecificTransactionHeader from "./specific-transaction-header";
import { SpecificTransactionMoreButton } from "./specific-transac-more-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleTableNoRHF } from "./simple-table-no-rhf";

type TApproveReleaseItems = {
  items: Pick<IBorrowedItemDetail, "borrowed_item_id">[];
};

export default function BorrowOfficeApproveTransactionSpecific({
  transactionId,
}: {
  transactionId: string;
}) {
  const { getRequestById } = useTransactionStore();
  const { setApcId } = useTransactionData();

  const transaction = getRequestById("transaction", transactionId);
  const transacStatus = transaction?.borrow_transaction_status;
  const transacStatusArray = REQUEST_TRANSACTION_STATUSES;

  const { data, isLoading, isSuccess, refetch } = useSpecificTransactionItems(
    transaction?.id || ""
  );
  const transacItems = data?.data || [];

  useEffect(() => {
    if (transaction?.apc_id) {
      setApcId(transaction.apc_id);
    }
  }, [transaction?.apc_id, setApcId]);

  // Accessing the start dates
  const items = Array.isArray(transacItems)
    ? transacItems.map((item: IOfficeSpecificTransaction) => item)
    : [];

  const hasApprovedItems = Object.values(transacItems).some((model) =>
    model.items.some((item) => item.borrowed_item_status === "APPROVED")
  );

  const approveReleaseForm = useForm<TApproveReleaseItems>({
    defaultValues: { items: [] },
    mode: "onChange",
  });

  const returnForm = useForm<TReturnItemSchemaArray>({
    resolver: zodResolver(ParentSchema),
    defaultValues: { items: [] },
    mode: "onBlur",
  });

  // Show when the transaction status is pending borrow approval
  const isShownApproveDisapproveBtns =
    transacStatus === transacStatusArray.PENDING_BORROWING_APPROVAL;

  // Show Release && Withhold Btns when transaction is approved
  // If transac is On Going but has Approved status items, still show this
  const isShownReleaseWithholdBtns =
    transacStatus === transacStatusArray.APPROVED ||
    (transacStatus === transacStatusArray.ON_GOING && hasApprovedItems);

  // Show Facilitate Return Btn if transaction is On Going and
  // Items no longer has Approved Status
  const isShownFacilitateReturnBtn =
    transacStatus == transacStatusArray.ON_GOING && !hasApprovedItems;

  if (isShownApproveDisapproveBtns) {
    return (
      <Form {...approveReleaseForm}>
        <div className="container mx-auto p-4 space-y-4">
          <div className="flex justify-between content-center">
            {/* Header Component */}
            <SpecificTransactionHeader
              transaction={transaction}
              withBackArrow={true}
            />

            <div className="flex items-center gap-2">
              {/* Approve && Disapprove */}
              {isShownApproveDisapproveBtns && (
                <>
                  <ApproveDisapproveButtons transactionId={transaction?.id} />
                  <SpecificTransactionMoreButton />
                </>
              )}
            </div>
          </div>

          {/* Transaction Progress Component */}
          <TransactionProgress
            transactionStatus={transaction?.borrow_transaction_status}
          />

          {/* Borrowing Details Component */}
          <div className="grid gap-4 md:grid-cols-2">
            <TransactionDetails transaction={transaction} />

            {/* Borrowed Items Table Component */}
            <SimpleTable
              isFetchLoading={isLoading}
              isFetchSuccess={isSuccess}
              refetchItems={refetch}
              items={transacItems}
              onSelect={(
                item: IBorrowedItemDetail,
                checked: boolean,
                getValues: (key: string) => IBorrowedItemDetail[],
                setValue: (
                  key: string,
                  value: Pick<IBorrowedItemDetail, "borrowed_item_id">[]
                ) => void
              ) =>
                onSelectApproveAndRelease(item, checked, getValues, setValue)
              }
            />
          </div>
        </div>
      </Form>
    );
  }

  if (isShownReleaseWithholdBtns) {
    return (
      <Form {...approveReleaseForm}>
        <div className="container mx-auto p-4 space-y-4">
          <div className="flex justify-between content-center">
            {/* Header Component */}
            <SpecificTransactionHeader
              transaction={transaction}
              withBackArrow={true}
            />

            <div className="flex items-center gap-2">
              {/* Release && Withhold */}
              {isShownReleaseWithholdBtns && (
                <>
                  <ReleaseWithholdButtons transactionId={transaction?.id} />

                  {/* Return Action should be present here because there are already possessed items */}
                  <SpecificTransactionMoreButton>
                    {/* Show only if transac status is On Going */}
                    {transacStatus === transacStatusArray.ON_GOING && (
                      <>
                        <CornerDownLeft className="mr-2 h-4 w-4" />
                        Facilitate Return
                      </>
                    )}
                  </SpecificTransactionMoreButton>
                </>
              )}
            </div>
          </div>

          {/* Transaction Progress Component */}
          <TransactionProgress
            transactionStatus={transaction?.borrow_transaction_status}
          />

          {/* Borrowing Details Component */}
          <div className="grid gap-4 md:grid-cols-2">
            <TransactionDetails transaction={transaction} />

            {/* Borrowed Items Table Component */}
            <SimpleTable
              isFetchLoading={isLoading}
              isFetchSuccess={isSuccess}
              refetchItems={refetch}
              items={transacItems}
              onSelect={onSelectApproveAndRelease}
            />
          </div>
        </div>
      </Form>
    );
  }

  if (isShownFacilitateReturnBtn) {
    return (
      <Form {...returnForm}>
        <div className="container mx-auto p-4 space-y-4">
          <div className="flex justify-between content-center">
            {/* Header Component */}
            <SpecificTransactionHeader
              transaction={transaction}
              withBackArrow={true}
            />

            <div className="flex items-center gap-2">
              {/* Return Btn ONLY */}
              {isShownFacilitateReturnBtn && (
                <>
                  <ReturnItemModal transacId={transaction?.id} />
                  <SpecificTransactionMoreButton />
                </>
              )}
            </div>
          </div>

          {/* Transaction Progress Component */}
          <TransactionProgress
            transactionStatus={transaction?.borrow_transaction_status}
          />

          {/* Borrowing Details Component */}
          <div className="grid gap-4 md:grid-cols-2">
            <TransactionDetails transaction={transaction} />

            {/* Borrowed Items Table Component */}
            <SimpleTable
              isFetchLoading={isLoading}
              isFetchSuccess={isSuccess}
              refetchItems={refetch}
              items={transacItems}
              onSelect={onSelectApproveAndRelease}
            />
          </div>
        </div>
      </Form>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between content-center">
        {/* Header Component */}
        <SpecificTransactionHeader
          transaction={transaction}
          withBackArrow={true}
        />
      </div>

      {/* Transaction Progress Component */}
      <TransactionProgress
        transactionStatus={transaction?.borrow_transaction_status}
      />

      {/* Borrowing Details Component */}
      <div className="grid gap-4 md:grid-cols-2">
        <TransactionDetails transaction={transaction} />

        {/* Borrowed Items Table Component */}
        <SimpleTableNoRHF
          isFetchLoading={isLoading}
          isFetchSuccess={isSuccess}
          refetchItems={refetch}
          items={transacItems}
        />
      </div>
    </div>
  );
}
