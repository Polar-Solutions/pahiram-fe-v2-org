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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTimeToHumanFormat } from "@/helper/date-utilities";
import {
  BORROWED_ITEM_STATUS_ARRAY,
  BORROWED_ITEM_STATUS_OPTIONS_CONSTANTS,
  RETURNED_ITEM_STATUS_OPTIONS,
} from "@/CONSTANTS/BORROW_ITEM_STATUSES_CONSTANT";
import { useAction } from "next-safe-action/hooks";
import { returnTransactionAction } from "@/core/actions/return-transaction";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFormContext } from "react-hook-form";
import { TReturnItemSchemaArray } from "@/lib/form-schemas/return-request-form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxWithNoApiIntegration } from "@/components/common/combobox/combobox-no-api-integration";

export default function ReturnModal() {
  const form = useFormContext();
  const { executeAsync, isExecuting } = useAction(returnTransactionAction);

  const handleSubmit = () => {};

  const items: TReturnItemSchemaArray = form.watch("items") || [];

  console.log("STSTSTST", RETURNED_ITEM_STATUS_OPTIONS);
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          {isExecuting ? <LoadingSpinner className="mr-2" /> : null}
          Facilitate Return
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Facilitate Return</DialogTitle>
        </DialogHeader>

        {items.map((item, index) => (
          <DialogDescription
            key={`item.${index}.borrowed_item_id`}
            className="flex flex-col gap-4"
          >
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
              <h1 className="font-bold text-base">{item.model_name}</h1>
              <Badge variant="default">{item.item_apc_id}</Badge>

              <div className="w-full">
                <h1>Due date {formatDateTimeToHumanFormat(item.due_date)}</h1>
              </div>
            </div>

            <FormField
              disabled={isExecuting}
              control={form.control}
              name={`items.${index}.item_status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Status</FormLabel>
                  <ComboboxWithNoApiIntegration
                    isDisabled={isExecuting}
                    selectedItem={field.value}
                    onSelect={field.onChange}
                    options={RETURNED_ITEM_STATUS_OPTIONS}
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
              name="user_defined_purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific purpose</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Note your observations" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogDescription>
        ))}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isExecuting}>
            {isExecuting ? <LoadingSpinner className="mr-2" /> : null}{" "}
            Execute Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
