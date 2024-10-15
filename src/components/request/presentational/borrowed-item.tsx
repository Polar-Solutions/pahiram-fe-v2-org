import React from 'react';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import ExpandTable from '@/components/common/expanding-table/expanding-table';
import { useEditRequest } from '@/hooks/request/useEditRequest';

interface BorrowedItemProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}

export default function BorrowedItem({ items, formatDateTime, formatBorrowStatus }: BorrowedItemProps) {
  const { isEditing, setEditedDetails } = useEditRequest(); // Zustand state for managing edit

  // Handle dropdown selection
  const handleDropdownChange = (value: string, field: string, index: number) => {
    setEditedDetails((prevDetails: any) => ({
      ...prevDetails,
      [index]: {
        ...prevDetails[index],
        [field]: value,
      },
    }));
  };

  return (
    <ExpandTable
      items={items}
      formatDateTime={formatDateTime}
      formatBorrowStatus={formatBorrowStatus}
      handleDropdownChange={handleDropdownChange} 
      isEditing={isEditing} 
    />
  );
}
