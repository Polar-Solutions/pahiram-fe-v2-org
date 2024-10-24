'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import {useRouter} from 'nextjs-toploader/app';
import { useSpecificTransaction  } from '@/core/data-access/requests';
import BorrowedItem from '@/components/request/presentational/borrowed-item';
import BorrowingDetail from '@/components/request/presentational/borrowing-detail';
import SpecificTransactionSkeleton from '@/components/request/presentational/specific-transaction-skeleton';
import { cancelBorrowRequestAction } from '@/core/actions/cancel-borrow-request';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface';
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { formatBorrowPurpose, formatBorrowStatus, checkTransactionStatus } from '@/helper/formatting-utilities';
import { handleApiClientSideError } from '@/core/handle-api-client-side-error';
import { Badge } from "@/components/ui/badge";
import {Button} from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog"
import { useEditRequest } from '@/hooks/request/useEditRequest';
import {toast} from "sonner";

export default function SpecificTransaction() {
  const { transacId } = useParams(); 
  const transactionId = Array.isArray(transacId) ? transacId[0] : transacId;

  const { data, isLoading } = useSpecificTransaction(transactionId);
  const transactionData = data?.data;
  const router = useRouter();
  const { isEditing, setIsEditing, setTransactionData, setEditedDetails, editedDetails, resetEditedDetails } = useEditRequest();

  
  if (data) {
    handleApiClientSideError(data);
  } 

  // Function to handle cancellation
  const handleCancelRequest = async () => {
    try {
      // Directly pass transactionId as argument
      const response = await cancelBorrowRequestAction({ transactionId });

      // Use 'in' operator to check if 'data' exists in response
      if (response && 'data' in response && response.data) {
        toast.success( "Success 🥳🎉", {
          position: "top-right",
          description: "Transaction cancelled successfully.",
        });
        router.back();
      } else {
        throw new Error('Cancellation failed.');
      }
    } catch (error) {
      toast.error( "Error 😭", {
        position: "top-right",
        description: "Failed to cancel transaction. Please try again later.",
        action: {
          label: "Report",
          onClick: () => {},
        }
      });
    }
  };

  const handleEditRequest = () => {
    setIsEditing(true);
    setEditedDetails({
      endorser: transactionData?.transac_data.endorsed_by?.full_name || '',
      purpose: transactionData?.transac_data.purpose,
      specifyPurpose: transactionData?.transac_data.user_defined_purpose || '',
    });
  };

  const handleSaveChanges = () => {
    // Here you would have logic to persist the changes (e.g., sending a request to the server).
    setIsEditing(false);
    // You can implement the logic to save the `editedDetails` in the backend
  };

  // Handle Discard Changes
  const handleDiscardChanges = () => {
    resetEditedDetails();  // Reset edited details to the original values
    setIsEditing(false);   // Exit the editing mode
  };

  if (isLoading) {
    return (
      <SpecificTransactionSkeleton />
    )
  }

  if (!transactionData) {
    return (
      <div>
        <h1 className='text-sm text-muted-foreground flex items-center'>Transaction not found</h1>
      </div>
    );
  }

   // Use checkTransactionStatus to get canCancel and canEdit
   const { canCancel, canEdit } = checkTransactionStatus(transactionData.transac_data.transac_status);

  // Make sure borrowedItems is an array
  const borrowedItems: IItem[] = Array.isArray(transactionData.items) ? transactionData.items : []; 

  return (
    <div className="flex flex-col space-y-4 w-full h-auto">
      {/* Transaction Details */}
      <div className="flex items-start">
        <div className="flex items-center mb-9">
            <svg className="w-8 h-8" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                onClick={() => router.back()}
                className='cursor-pointer'
              />
            </svg>
            <div className="ml-4">
              <h1 className="text-xl font-bold">{transactionData.transac_data.custom_transac_id}</h1>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold mr-2">{transactionData.transac_data.department_acronym}</h2>
                
                {/* Render status and formatted date */}
                <p className="text-sm text-muted-foreground flex items-center">
                  {(() => {
                    const { formattedStatus, badgeClass } = formatBorrowStatus(transactionData.transac_data.transac_status);
                    return (
                      <Badge className={badgeClass}>
                        {formattedStatus}
                      </Badge>
                    );
                  })()}
                  <span className="ml-2">on {formatDateTimeToHumanFormat(transactionData.transac_data.updated_at)}</span>
                </p>
              </div>

            </div>
        </div>
      </div>

      {/* BorrowingDetail and BorrowedItem */}
      <div className="flex">
        <BorrowingDetail 
          endorser={isEditing ? editedDetails.endorser : transactionData.transac_data.endorsed_by?.full_name || 'No Endorser'}
          purpose={isEditing ? editedDetails.purpose : formatBorrowPurpose(transactionData.transac_data.purpose)} 
          specifyPurpose={isEditing ? editedDetails.specifyPurpose : transactionData.transac_data.user_defined_purpose || 'No specified purpose'} 
        />
        <BorrowedItem 
          items={borrowedItems} // Ensure this is an array of IItem
          formatDateTime={formatDateTimeToHumanFormat} 
          formatBorrowStatus={formatBorrowStatus} 
        />
      </div>

      <div className='space-x-4 flex justify-end'>
        {isEditing ? (
          <>
            {/* Discard Changes button */}
            <Button variant="outline" onClick={handleDiscardChanges}>
              Discard Changes
            </Button>
            
            {/* Save Changes button */}
            <Button variant="default" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            {canCancel && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Cancel Request</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className='mb-2'>Cancel Request</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel this request? This is an irreversible action.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button onClick={handleCancelRequest} type='button'>Cancel Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            
            {/* Edit Request button */}
            {canEdit && (
              <Button onClick={handleEditRequest}>
                Edit Request
              </Button>
            )}
          </>
        )}
      </div>
    </div>

  );
}
