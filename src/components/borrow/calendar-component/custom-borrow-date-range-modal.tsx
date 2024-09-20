import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"; // Adjust import based on your actual path
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ComboboxWithNoApiIntegration } from "@/components/common/combobox/combobox-no-api-integration";
import { FormProvider, useForm } from "react-hook-form";

import { BORROW_TIME_SLOTS } from "@/CONSTANTS/BORROW_TIME_SLOTS";
import { ControlledDatePicker } from "../../common/controlled-date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface CustomDatePickerModalProps {
  isOpen: boolean; // The state of the dialog (open or closed)
  onClose: () => void; // Function to close the dialog
}

const formSchema = z.object({
  start_date: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  start_time: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  return_date: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  return_time: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const CustomBorrowDateRangeModal: React.FC<
  CustomDatePickerModalProps
> = ({ isOpen, onClose }) => {
  const { watch, setValue } = useFormContext();

  // Retrieve current dates from RHF
  const rhfStartDate = watch("start_date");
  const rhfReturnDate = watch("return_date");

  // Split Time and Date from RHF State
  const [startDate, startTime] = rhfStartDate.split("T");
  const [returnDate, returnTime] = rhfReturnDate.split("T");

  // Start Date and Time Handlers
  const handleStartDateChange = (date: string) => {
    setValue("start_date", date + "T" + (startTime || "07:30"));
  };
  const handleStartTimeChange = (time: string) => {
    setValue("start_date", startDate + "T" + time);
  };

  // Return Date and Time Handlers
  const handleReturnDateChange = (date: string) => {
    setValue("return_date", date + "T" + (returnTime || "07:30"));
  };
  const handleReturnTimeChange = (time: string) => {
    setValue("return_date", returnDate + "T" + time);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader className="mb-2">
          <DialogTitle>Custom Range</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            {/*
             *
             * Start Date-Time Inputs
             *
             */}
            <div className="flex flex-col gap-2">
              <Label>Start Date and Time</Label>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <ControlledDatePicker
                  selectedDate={startDate}
                  // minDate={""}
                  onDateChange={(date: string) => handleStartDateChange(date)}
                  placeholder="Select start date"
                />

                <ComboboxWithNoApiIntegration
                  options={BORROW_TIME_SLOTS}
                  placeholder="Start time"
                  onSelect={(time: string) => handleStartTimeChange(time)}
                  selectedTime={startTime}
                />
              </div>
            </div>

            {/*
             *
             * Return Date-Time Inputs
             *
             */}
            <div className="flex flex-col gap-2">
              <Label>Return Date and Time</Label>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <ControlledDatePicker
                  selectedDate={returnDate}
                  minDate={
                    watch("start_date")
                      ? new Date(watch("start_date"))
                      : new Date()
                  }
                  onDateChange={(date: string) => handleReturnDateChange(date)}
                  placeholder="Select return date"
                />

                <ComboboxWithNoApiIntegration
                  options={BORROW_TIME_SLOTS}
                  placeholder="Return time"
                  onSelect={(time: string) => handleReturnTimeChange(time)}
                  selectedTime={returnTime}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
