import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table"; // Adjust path as needed
import { IItem, IBorrowedItemDetail } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import { Badge } from "@/components/ui/badge"; // Adjust path as needed

// Define the props type to accept IBorrowedItemDetail[] instead of IItem[]
interface ExpandingCollapsibleProps {
  items: IBorrowedItemDetail[]; // Still expect IBorrowedItemDetail[]
  apcId: string;                // Add apcId as prop
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}


export default function ExpandingCollapsible({
  items,
  apcId,
  formatBorrowStatus
}: ExpandingCollapsibleProps) {
  return (
    <>
      {items.map((item, index) => {
        const { formattedStatus, badgeClass } = formatBorrowStatus(item.borrowed_item_status);
        return (
          <TableRow key={`${item.borrowed_item_id}-${index}`} className='flex justify-evenly'>
            <TableCell className="font-medium">{item.apc_id}</TableCell>
            <TableCell className="text-start">
              <Badge className={badgeClass}>{formattedStatus}</Badge>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

