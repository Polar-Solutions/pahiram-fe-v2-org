"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTimeToHumanFormat } from "@/helper/date-utilities";
import { useAction } from "next-safe-action/hooks";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxWithNoApiIntegration } from "@/components/common/combobox/combobox-no-api-integration";
import { extractFormValidationErrorsAndTriggerToast } from "@/helper/extract-form-validation-errors-and-trigger-toast";
import { TReturnItemSchemaArray } from "@/lib/form-schemas/return-request-form-schema";
import { COMPLETE_BORROWED_ITEM_COMBOBOX_OPTIONS } from "@/CONSTANTS/BORROWED_ITEM_STATUS";
import { returnTransactionAction } from "@/core/actions/return-transaction-action";
import {
  handleApiClientSideError,
  IClientSideApiHandlerResponse,
} from "@/core/handle-api-client-side-error";

interface ReturnModalProps {
  transacId: string | undefined;
  // isExecuting: boolean;
}

export const ReturnItemModal: React.FC<ReturnModalProps> = ({ transacId }) => {
  const form = useFormContext();
  const returnItems: TReturnItemSchemaArray = form.watch() || [];
  const hasNoSelectedItem = returnItems?.items?.length === 0;

  const { executeAsync, isExecuting } = useAction(returnTransactionAction);

  const submitHandler = async () => {
    const preparedPayload = returnItems?.items?.map((item) => {
      return {
        borrowed_item_id: item?.borrowed_item_id,
        item_status: item?.item_status,
        remarks_by_receiver: item?.remarks_by_receiver,
        ...(item?.penalty && { penalty: item?.penalty }),
      };
    });

    if (preparedPayload) {
      const res = await executeAsync({
        transactionId: transacId,
        items: preparedPayload,
      });

      const responseData: IClientSideApiHandlerResponse = {
        success: res?.data?.success,
        error: res?.data?.error,
        isSuccessToast: true,
      };

      // If success close dialog and clear RHF State
      if (res?.data?.success) {
        closeDialog();
        form.reset();

        // Delay toaster if success so the dialog close and toast trigger is not simultaneous
        setTimeout(function () {
          handleApiClientSideError(responseData);
        }, 1000);
      } else {
        handleApiClientSideError(responseData);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          type="button"
          disabled={!transacId || hasNoSelectedItem || isExecuting}
        >
          {isExecuting ? <LoadingSpinner className="mr-2" /> : null}
          Facilitate Return
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Facilitate Return</DialogTitle>
        </DialogHeader>
        <form
          className="container mx-auto p-4 space-y-4"
          id="return-items-form"
          onSubmit={form.handleSubmit(submitHandler, (errors) => {
            extractFormValidationErrorsAndTriggerToast(errors);
          })}
        >
          {returnItems?.items?.map((item, index) => (
            <div
              key={`items.${index}.borrowed_item_id`}
              className="flex flex-col gap-4"
            >
              <hr className="my-2" />
              <div className="flex flex-wrap gap-2">
                <h1 className="font-bold text-base">{item.model_name}</h1>
                <Badge variant="default">{item.item_apc_id}</Badge>
                <div className="w-full">
                  <h1>Due on {formatDateTimeToHumanFormat(item.due_date)}</h1>
                </div>
              </div>
              <FormField
                // disabled={isExecuting}
                control={form.control}
                name={`items.${index}.item_status`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Status</FormLabel>
                    <ComboboxWithNoApiIntegration
                      isDisabled={isExecuting}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      options={COMPLETE_BORROWED_ITEM_COMBOBOX_OPTIONS}
                      placeholder="Select status"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isExecuting}
                control={form.control}
                name={`items.${index}.penalty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penalty</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Type amount incurred"
                        type="number"
                        min="0"
                        step="any"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isExecuting}
                control={form.control}
                name={`items.${index}.remarks_by_receiver`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Note your comments / observations..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="return-items-form" disabled={isExecuting}>
            {isExecuting ? <LoadingSpinner className="mr-2" /> : null} Execute
            Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
