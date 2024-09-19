import RequestCard from '@/components/request/presentational/request-card';
import { useTabsStore } from '@/hooks/request/useTabs';
import { IBorrowRequest } from '@/lib/interfaces';

import { useSearch } from '@/hooks/borrow/useSearch';


interface RequestListProps {
  borrow_requests: IBorrowRequest[];
}

export default function RequestList({ borrow_requests }: RequestListProps) {
  const { selectedFilterTab, filterOffice } = useTabsStore();
  const { searchQuery } = useSearch();

  const filteredRequests = borrow_requests
    .filter((request) => {
      const pendingStatuses = ['PENDING_BORROWING_APPROVAL', 'PENDING_ENDORSER_APPROVAL'];

      // Make sure selectedFilterTab is compared in a case-insensitive manner
      const matchesTab = selectedFilterTab
        ? selectedFilterTab.toUpperCase() === "PENDING"
          ? pendingStatuses.includes(request.transac_status)
          : request.transac_status === selectedFilterTab.toUpperCase()
        : true;

      // Filter by office
      const matchesOffice = filterOffice ? request.department_acronym === filterOffice : true;

      // Filter by search query
      const matchesSearch = searchQuery
        ? request.custom_transac_id.toLowerCase().includes(searchQuery.toLowerCase()) 
        // || (request.endorsed_by && request.endorsed_by.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      return matchesTab && matchesOffice && matchesSearch;
    })
    // Sort by created_at (newest to oldest), and then by custom_transac_id (alphabetically)
    .sort((a, b) => {
      const dateComparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (dateComparison === 0) {
        // If created_at is the same, sort by custom_transac_id alphabetically
        return a.custom_transac_id.localeCompare(b.custom_transac_id);
      }
      return dateComparison;
    });

    if (!filteredRequests.length) {
      return (
        <div className='text-center text-muted-foreground col-span-full'>
          No results found
        </div>
      );
    }

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
