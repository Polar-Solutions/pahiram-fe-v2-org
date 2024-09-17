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
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { SelectLabel } from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomDatePickerModalProps {
  isOpen: boolean; // The state of the dialog (open or closed)
  onClose: () => void; // Function to close the dialog
}

export const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-lg md:max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle>Set your custom date</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
            <label>Select date</label>
            <DateTimePicker />
          </div>

          <div className="flex flex-col">
            <label>Select return date</label>
            <DateTimePicker />
          </div>
        </div>

        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};
