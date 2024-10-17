import React, { useEffect, useState } from 'react';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import ExpandTable from '@/components/common/expanding-table/expanding-table';
import { useEditRequest } from '@/hooks/request/useEditRequest';
import { getItemsPaginationUseCase } from '@/core/use-cases/items'; // Adjust path as needed

interface BorrowedItemProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}

export default function BorrowedItem({ items, formatDateTime, formatBorrowStatus }: BorrowedItemProps) {
  const { isEditing, setEditedDetails } = useEditRequest(); // Zustand state for managing edit
  const [modelNames, setModelNames] = useState<string[]>([]); // State to hold model names

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

  // Fetch model names from the backend
  const fetchModelNames = async () => {
    try {
      const { data } = await getItemsPaginationUseCase(1); // Fetch page 1
      const models = data.items.map((item: any) => item.model_name); // Adjust as needed
      setModelNames(models);
    } catch (error) {
      console.error("Error fetching model names:", error);
    }
  };

  // Use effect to fetch model names when the component mounts
  useEffect(() => {
    fetchModelNames();
  }, []);

  console.log(items);

  return (
    <ExpandTable
      items={items}
      formatDateTime={formatDateTime}
      formatBorrowStatus={formatBorrowStatus}
      handleDropdownChange={handleDropdownChange} 
      isEditing={isEditing} 
      modelNames={modelNames} // Pass the fetched model names to ExpandTable
    />
  );
}
