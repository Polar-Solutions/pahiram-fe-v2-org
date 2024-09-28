import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import { Badge } from "@/components/ui/badge"; // Import your Badge component

// In BorrowedItem.tsx
interface BorrowedItemProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string }; // Update this line
}

export default function BorrowedItem({ items, formatDateTime, formatBorrowStatus }: BorrowedItemProps) {
  return (
    <div className='w-3/5 '>
      <h1 className='text-xl font-bold'>Borrowing items</h1>
      <Table>
        <TableCaption className="w-full text-right">
          You may now claim items from respective departments.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { formattedStatus, badgeClass } = formatBorrowStatus(item.borrowed_item_status);
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.model_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{`${formatDateTime(item.start_date)}`}</TableCell>
                <TableCell>{`${formatDateTime(item.due_date)}`}</TableCell>
                <TableCell className="text-start">
                  <Badge className={badgeClass}>{formattedStatus}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

