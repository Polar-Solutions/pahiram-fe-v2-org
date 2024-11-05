"use client";

import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { approveTransactionAction } from "@/core/actions/approve-transaction";
import {
  handleApiClientSideError,
  IClientSideApiHandlerResponse,
} from "@/core/handle-api-client-side-error";
import {
  TApproveTransactionSchema,
  TReleaseTransactionSchema,
} from "@/lib/form-schemas/approve-transaction-schema";
import { IBorrowedItemDetail } from "@/lib/interfaces/get-specific-transaction-interface";
import { Check, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { handleTransactionItemReleased } from "../../handle-transaction-approval";
import { releaseTransactionAction } from "@/core/actions/release-transaction";
import { useFormContext } from "react-hook-form";

// Define a type for your form values
type IApproveItems = Pick<IBorrowedItemDetail, "borrowed_item_id">[];

interface IApproveHandler {
  watch: () => IApproveItems;
  isReleased: boolean;
  executeAsync: (values: TReleaseTransactionSchema) => Promise<any>; // assuming executeAsync does not return a value
}

const releaseHandler = async (
  transactionId: string | undefined,
  handler: IApproveHandler
) => {
  const currentValues = handler.watch();

  // Map over the items to add the `isApproved` property
  const items = currentValues.map((item) => ({
    borrowedItemId: item.borrowed_item_id, // Ensure these property names match `ApproveTransactionSchema`
    isReleased: handler.isReleased, // true or false
  }));

  await handleTransactionItemReleased(
    transactionId,
    handler.executeAsync,
    items
  );
};

export const ReleaseWithholdButtons = ({
  transactionId,
}: {
  transactionId: string | undefined;
}) => {
  const { executeAsync, isExecuting } = useAction(releaseTransactionAction);
  const { watch } = useFormContext();
  const hasNoSelectedItem = watch("items").length === 0;

  return (
    <div className="flex gap-2">
      {/* Release */}
      <ConfirmationDialog
        content={{
          title: "Release selected items?",
          description: "",
        }}
        footerBtns={{
          cancel: "Cancel",
          action: "Release Items",
          actionFn: () =>
            releaseHandler(transactionId, {
              watch: () => watch("items"),
              isReleased: true,
              executeAsync: executeAsync,
            }),
        }}
      >
        <Button disabled={!transactionId || isExecuting || hasNoSelectedItem}>
          <Check className="mr-2 h-4 w-4" />
          Release
        </Button>
      </ConfirmationDialog>

      {/* Withhold */}
      <ConfirmationDialog
        content={{
          title: "Withhold selected items?",
          description: "",
        }}
        footerBtns={{
          cancel: "Cancel",
          action: "Withhold Items",
          actionFn: () =>
            releaseHandler(transactionId, {
              watch: () => watch("items"),
              isReleased: false,
              executeAsync: executeAsync,
            }),
        }}
      >
        <Button
          disabled={!transactionId || isExecuting || hasNoSelectedItem}
          variant="secondary"
        >
          <X className="mr-2 h-4 w-4" />
          Withhold
        </Button>
      </ConfirmationDialog>
    </div>
  );
};
