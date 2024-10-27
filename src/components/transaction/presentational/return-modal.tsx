import React from 'react';
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
import { ChevronUpIcon, DividerHorizontalIcon, DividerVerticalIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSelectedItemsStore } from "@/hooks/transaction/useSelectedItem";
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { RETURNED_STATUSES, BORROWED_ITEM_STATUS_ARRAY } from '@/CONSTANTS/BORROW_ITEM_STATUSES_CONSTANT';

export default function ReturnModal() {
  const { selectedItems } = useSelectedItemsStore(); // Get selected items from Zustand store
  console.log(selectedItems);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Facilitate Return</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto"> {/* Added max-height and scroll */}
          <DialogHeader>
            <DialogTitle>Facilitate Return</DialogTitle>
          </DialogHeader>

          {/* Map over the selectedItems to render a dialog description for each */}
          {selectedItems.map((item) => (
            <DialogDescription key={item.id}>
                <hr className="my-4" />
              <div className='flex items-center space-x-2 m-4'>
                <h1 className='font-bold text-base'>{item.model_name}</h1>
                <Badge variant="secondary">{item.start_date}</Badge> {/* Example usage of model_name */}
              </div>

              <div className='m-4'>
                <h1>Return Date: {`${' ' + formatDateTimeToHumanFormat(item.due_date)}`}</h1>
              </div>

              <div className='m-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Item Status
                      <ChevronUpIcon className="ml-2 inline-block h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                    {/* Map over RETURNED_STATUSES to populate the dropdown */}
                    {RETURNED_STATUSES.map((status) => {
                      const statusDescription = BORROWED_ITEM_STATUS_ARRAY.find(
                        item => item.borrowed_item_status === status
                      )?.item_status;
                      return (
                        <DropdownMenuItem key={status}>
                          {statusDescription || status}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='flex items-center space-x-2 m-4'>
                <h1>Penalty</h1>
                <Input />
              </div>

              <div className='space-y-2 m-4'>
                <h1>Remarks by receiver</h1>
                <Textarea />
              </div>

            </DialogDescription>
          ))}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> {/* Close dialog on cancel */}
            <Button>Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
