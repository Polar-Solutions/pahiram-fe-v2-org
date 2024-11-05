"use client";

import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { approveTransactionAction } from "@/core/actions/approve-transaction";
import {
  handleApiClientSideError,
  IClientSideApiHandlerResponse,
} from "@/core/handle-api-client-side-error";
import { TApproveTransactionSchema } from "@/lib/form-schemas/approve-transaction-schema";
import { IBorrowedItemDetail } from "@/lib/interfaces/get-specific-transaction-interface";
import { Check, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useFormContext } from "react-hook-form";

// Define a type for your form values
type IApproveItems = Pick<IBorrowedItemDetail, "borrowed_item_id">[];

interface IApproveHandler {
  watch: () => IApproveItems;
  reset: () => void;
  isApproved: boolean;
  executeAsync: (input: TApproveTransactionSchema) => Promise<any>; // assuming executeAsync does not return a value
}

const approveHandler = async (
  transactionId: string | undefined,
  handler: IApproveHandler
) => {
  const currentValues = handler.watch();

  // Map over the items to add the `isApproved` property
  const items = currentValues.map((item) => ({
    borrowedItemId: item.borrowed_item_id, // Ensure these property names match `ApproveTransactionSchema`
    isApproved: handler.isApproved, // true or false
  }));

  const res = await handler.executeAsync({ transactionId, items });

  const responseData: IClientSideApiHandlerResponse = {
    success: res?.data?.success,
    error: res?.data?.error,
    isSuccessToast: true,
  };

  if (res?.data?.success) {
    handler.reset();
  }
  handleApiClientSideError(responseData);
};

export const ApproveDisapproveButtons = ({
  transactionId,
}: {
  transactionId: string | undefined;
}) => {
  const { executeAsync, isExecuting, hasSucceeded } = useAction(
    approveTransactionAction
  );
  const { watch, reset } = useFormContext();
  const hasNoSelectedItem = watch("items").length === 0;

  return (
    <div className="flex gap-2">
      {/* Disapprove */}
      <ConfirmationDialog
        content={{
          title: "Approve selected items?",
          description: "",
        }}
        footerBtns={{
          cancel: "Cancel",
          action: "Approve Items",
          actionFn: () =>
            approveHandler(transactionId, {
              watch: () => watch("items"),
              reset: () => reset(),
              isApproved: true,
              executeAsync: executeAsync,
            }),
        }}
      >
        <Button disabled={!transactionId || isExecuting || hasNoSelectedItem}>
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </ConfirmationDialog>

      {/* Disapprove */}
      <ConfirmationDialog
        content={{
          title: "Disapprove selected items?",
          description: "",
        }}
        footerBtns={{
          cancel: "Cancel",
          action: "Disapprove Items",
          actionFn: () =>
            approveHandler(transactionId, {
              watch: () => watch("items"),
              reset: () => reset(),
              isApproved: false,
              executeAsync: executeAsync,
            }),
        }}
      >
        <Button
          disabled={!transactionId || isExecuting || hasNoSelectedItem}
          variant="secondary"
        >
          <X className="mr-2 h-4 w-4" />
          Disapprove
        </Button>
      </ConfirmationDialog>
    </div>
  );

  
};
