'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import { useSpecificTransaction } from '@/core/data-access/requests';
import BorrowedItem from '@/components/request/presentational/borrowed-item';
import BorrowingDetail from '@/components/request/presentational/borrowing-detail';
import { useTabsStore } from '@/hooks/request/useTabs';
import { ITransacData } from '@/lib/interfaces/get-specific-transaction-interface';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface';
import { formatDateTimeToHumanFormat } from '@/helper/date-utilities';
import { formatBorrowPurpose, formatBorrowStatus } from '@/helper/formatting-utilities';
import { handleApiClientSideError } from '@/core/handle-api-client-side-error';
import { Badge } from "@/components/ui/badge";

export default function SpecificTransaction() {
  const { transacId } = useParams(); 
  const transactionId = Array.isArray(transacId) ? transacId[0] : transacId;

  const { data, isLoading } = useSpecificTransaction(transactionId);
  const transactionData = data?.data;
  const router = useRouter();
  
  if (data) {
    handleApiClientSideError(data);
  } 
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!transactionData) {
    return <div>No transaction found.</div>;
  }

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
          endorser={transactionData.transac_data.remarks_by_endorser || 'No Endorser'} 
          purpose={formatBorrowPurpose(transactionData.transac_data.purpose)} 
          specifyPurpose={transactionData.transac_data.user_defined_purpose || 'No specified purpose'} 
        />
        <BorrowedItem 
          items={borrowedItems} // Ensure this is an array of IItem
          formatDateTime={formatDateTimeToHumanFormat} 
          formatBorrowStatus={formatBorrowStatus} 
        />
      </div>
    </div>
  );
}
