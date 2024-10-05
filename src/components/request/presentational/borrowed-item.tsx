// BorrowedItem.tsx
import React from 'react';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import ExpandTable from '@/components/common/expanding-table/expanding-table';

interface BorrowedItemProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}

export default function BorrowedItem({ items, formatDateTime, formatBorrowStatus }: BorrowedItemProps) {
  return (
    <ExpandTable 
      items={items} 
      formatDateTime={formatDateTime} 
      formatBorrowStatus={formatBorrowStatus}
    />
  );
}
