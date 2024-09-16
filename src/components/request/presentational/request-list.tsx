import RequestCard from '@/components/request/presentational/request-card';
import { useTabsStore } from '@/hooks/request/useTabs';
import { IBorrowRequest } from '@/lib/interfaces';

interface RequestListProps {
  borrow_requests: IBorrowRequest[];
}

export default function RequestList({ borrow_requests }: RequestListProps) {
  const { selectedFilterTab, filterOffice } = useTabsStore();

  const filteredRequests = borrow_requests.filter((request) => {
    const pendingStatuses = ['PENDING_BORROWING_APPROVAL', 'PENDING_ENDORSER_APPROVAL'];
  
    // Make sure selectedFilterTab is compared in a case-insensitive manner
    const matchesTab = selectedFilterTab
      ? selectedFilterTab.toUpperCase() === "PENDING"
        ? pendingStatuses.includes(request.transac_status)
        : request.transac_status === selectedFilterTab.toUpperCase()
      : true;

    // Filter by office
    const matchesOffice = filterOffice ? request.department_acronym === filterOffice : true;

    return matchesTab && matchesOffice;
  });

  if (!filteredRequests.length) {
    return (
      <div className='text-center text-muted-foreground col-span-full'>
        No results found
      </div>
    );
  }

  return (
    <>
      {filteredRequests.map((borrow_request, index) => (
        <RequestCard key={index} props={{ borrow_request }} />
      ))}
    </>
  );
}
