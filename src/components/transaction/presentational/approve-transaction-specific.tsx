'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ExpandTable from '@/components/common/expanding-table/expanding-table';
import { formatBorrowStatus, formatBorrowPurpose } from '@/helper/formatting-utilities';
import { useEditRequest } from '@/hooks/request/useEditRequest';
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';

export default function ApproverSpecificReqTrans() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extracting the query parameters
  const transactions = JSON.parse(searchParams.get('transactions') || '{}');
  const items = JSON.parse(searchParams.get('items') || '[]');
  const { isEditing, setEditedDetails } = useEditRequest();

  // Handle changes for dropdowns
  const handleDropdownChange = (value: string, field: string, index: number) => {
    setEditedDetails((prevDetails: any) => ({
      ...prevDetails,
      [index]: {
        ...prevDetails[index],
        [field]: value,
      },
    }));
  };

  console.log(items)

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt={transactions.borrower || 'Borrower'} />
            <AvatarFallback>{transactions.borrower?.charAt(0) || 'B'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{transactions.borrower || 'Unknown Borrower'} {transactions.apc_id}</h1>
            <p className="text-sm text-muted-foreground">
              Submitted {transactions.created_at ? new Date(transactions.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button>Approve</Button>
          <Button variant="outline">Decline</Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary">
          {transactions.purpose
            ? transactions.purpose
                .toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char: string) => char.toUpperCase())
            : "N/A"
          }
        </Badge>
        {items.map((item: any, index: number) => (
          <Badge variant="secondary" key={index}>{item.quantity} item</Badge>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{transactions.custom_transac_id || 'N/A'}</p>
      <p className="text-sm">Total Borrowing Period:
        {items.map((item: any, index: number) => (
          <React.Fragment key={index}>
            {" "}
            {new Date(item.start_date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }) + " "}
            to
            {" "}
            {new Date(item.due_date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          </React.Fragment>
        ))}
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={33} className="w-full" />
          <div className="flex justify-between mt-2 text-sm">
            <span>Submitted</span>
            <span>Approved</span>
            <span>Borrowed</span>
            <span>Returned</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Borrowing details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Endorser</label>
              <Input value={transactions.endorsed_by?.full_name || 'N/A'} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Purpose</label>
              <Input 
                value={transactions.purpose
                  ? transactions.purpose
                      .toLowerCase()
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (char: string) => char.toUpperCase())
                  : "N/A"
                } 
                readOnly 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Specify purpose</label>
              <Input value={transactions.user_defined_purpose || 'N/A'} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Borrowed items</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpandTable
              items={items}
              formatDateTime={formatDateTimeToHumanFormat}
              formatBorrowStatus={formatBorrowStatus}
              handleDropdownChange={handleDropdownChange}
              isEditing={isEditing}
              modelNames={[]} // Add model names if necessary
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
