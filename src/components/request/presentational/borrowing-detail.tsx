import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useEditRequest } from '@/hooks/request/useEditRequest'; // Import your Zustand hook

interface BorrowingDetailProps {
  endorser: string;
  purpose: string;
  specifyPurpose: string;
}

export default function BorrowingDetail({ endorser, purpose, specifyPurpose }: BorrowingDetailProps) {
  const { isEditing, setEditedDetails } = useEditRequest(); // Access Zustand store

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setEditedDetails({ [field]: event.target.value }); // Update edited details
  };

  return (
    <div className='w-2/5'>
      <h1 className='text-xl font-bold'>Borrowing details</h1>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Endorser</Label>
        <Input 
          type="text" 
          value={endorser} 
          disabled={!isEditing} 
          onChange={(e) => handleInputChange(e, 'endorser')} // Handle change
        />
      </div>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Purpose</Label>
        <Input 
          type="text" 
          value={purpose} 
          disabled={!isEditing} 
          onChange={(e) => handleInputChange(e, 'purpose')} // Handle change
        />
      </div>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Specify Purpose</Label>
        <Textarea 
          value={specifyPurpose} 
          disabled={!isEditing} 
          onChange={(e) => handleInputChange(e, 'specifyPurpose')} // Handle change
        />
      </div>
    </div>
  );
}
