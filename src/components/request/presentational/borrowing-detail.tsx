import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

interface BorrowingDetailProps {
  endorser: string;
  purpose: string;
  specifyPurpose: string;
}

export default function BorrowingDetail({ endorser, purpose, specifyPurpose }: BorrowingDetailProps) {
  return (
    <div className='w-2/5'>
      <h1 className='text-xl font-bold'>Borrowing details</h1>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Endorser</Label>
        <Input type="text" value={endorser} disabled />
      </div>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Purpose</Label>
        <Input type="text" value={purpose} disabled />
      </div>

      <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
        <Label>Specify Purpose</Label>
        <Textarea value={specifyPurpose} disabled />
      </div>
    </div>
  );
}
