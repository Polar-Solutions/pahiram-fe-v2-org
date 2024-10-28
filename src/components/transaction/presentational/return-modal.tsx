"use client";

import React, { useState } from 'react';
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
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSelectedItemsStore } from "@/hooks/transaction/useSelectedItem";
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { RETURNED_STATUSES, BORROWED_ITEM_STATUS_ARRAY } from '@/CONSTANTS/BORROW_ITEM_STATUSES_CONSTANT';
import { useAction } from "next-safe-action/hooks";
import { returnTransactionAction } from '@/core/actions/return-transaction';
import { handleTransactionReturn } from '@/components/transaction/handle-transaction-approval';
import { useTransactionData } from '@/hooks/transaction/useTransaction';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ReturnModal() {
  const { selectedItems } = useSelectedItemsStore(); 
  const {transactionId} = useTransactionData();
  const { executeAsync, isExecuting } = useAction(returnTransactionAction);

  const [selectedStatuses, setSelectedStatuses] = useState<{ [key: string]: { display: string, value: string } | null }>({});
  const [penalties, setPenalties] = useState<{ [key: string]: string }>({});
  const [remarksByReceiver, setRemarksByReceiver] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  console.log(transactionId)

  const handleStatusSelect = (itemId: string, status: { display: string, value: string }) => {
    setSelectedStatuses((prevState) => ({
      ...prevState,
      [itemId]: status,
    }));
    setErrors((prevState) => ({ ...prevState, [itemId]: '' }));
  };

  const handlePenaltyChange = (itemId: string, value: string) => {
    setPenalties((prevState) => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const handleRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarksByReceiver(event.target.value);
  };

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors: { [key: string]: string } = {};
    const returnItems: { borrowedItemId: string, status: string, penalty?: string, remarkByReceiver: string }[] = [];
  
    selectedItems.forEach((item) => {
      const selectedStatus = selectedStatuses[item.id];
      const penalty = penalties[item.id];
  
      // Check if the selected status is not "RETURNED" and ensure penalty is provided
      if (selectedStatus?.value !== 'RETURNED' && (!penalty || penalty.trim() === '')) {
        newErrors[item.id] = 'Penalty is required for this status.';
        hasError = true;
      } else {
        returnItems.push({
          borrowedItemId: item.id,
          status: selectedStatus?.value || '',
          remarkByReceiver: remarksByReceiver,
          penalty: '1000' // Always include penalty if there's a value, even if status is RETURNED
        });
      }
    });
  
    setErrors(newErrors);
  
    if (!hasError) {
      console.log('Submitting return with penalties where applicable...');
      // Submit the return transaction along with penalties and remarks
      await handleTransactionReturn(transactionId, executeAsync, returnItems);
    }
  };
  
  

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          
          <Button>
          {isExecuting ? <LoadingSpinner className="mr-2" /> : null} 
            Facilitate Return
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Facilitate Return</DialogTitle>
          </DialogHeader>

          {selectedItems.map((item) => (
            <DialogDescription key={item.id}>
              <hr className="my-4" />
              <div className="flex items-center space-x-2 m-4">
                <h1 className="font-bold text-base">{item.model_name}</h1>
                <Badge variant="secondary">{formatDateTimeToHumanFormat(item.start_date)}</Badge>
              </div>

              <div className="m-4">
                <h1>Return Date: {formatDateTimeToHumanFormat(item.due_date)}</h1>
              </div>

              <div className="m-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedStatuses[item.id] ? selectedStatuses[item.id]?.display : 'Select Status'}
                      <ChevronUpIcon className="ml-2 inline-block h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                    {RETURNED_STATUSES.map((status) => {
                      const matchedStatus = BORROWED_ITEM_STATUS_ARRAY.find(
                        s => s.borrowed_item_status === status
                      );
                      const statusDisplay = matchedStatus?.item_status || status;

                      return (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusSelect(item.id, { display: statusDisplay, value: status })}
                        >
                          {statusDisplay}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2 m-4">
                <h1>Penalty</h1>
                <Input
                  type="number"
                  value={penalties[item.id] || ''}
                  onChange={(e) => handlePenaltyChange(item.id, e.target.value)}
                  className={errors[item.id] ? 'border-red-500' : ''}
                  placeholder="Enter penalty"
                />
                {errors[item.id] && <p className="text-red-500">{errors[item.id]}</p>}
              </div>

              <div className="space-y-2 m-4">
                <h1>Remarks by Receiver</h1>
                <Textarea 
                  value={remarksByReceiver} 
                  onChange={handleRemarksChange} 
                />
              </div>
            </DialogDescription>
          ))}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={isExecuting}>
              {isExecuting ? <LoadingSpinner className="mr-2" /> : null} {/* Add spinner */}
              Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
