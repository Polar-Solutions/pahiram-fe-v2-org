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

// In BorrowedItem.tsx
interface BorrowedItemProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatStatus: (status: string) => string; // Add this line
}

export default function BorrowedItem({ items, formatDateTime, formatStatus }: BorrowedItemProps) {
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
            <TableHead>Borrowing Period</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.model_name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{`${formatDateTime(item.start_date)} - ${formatDateTime(item.due_date)}`}</TableCell>
              <TableCell className="text-right">{formatStatus(item.borrowed_item_status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

