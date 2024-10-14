import RequestCard from '@/components/request/presentational/request-card';
import { useTabsStore } from '@/hooks/request/useTabs';
import { IBorrowRequest } from '@/lib/interfaces';
import { useSearch } from '@/hooks/borrow/useSearch';
import ApproverReqTransCard from "@/components/approver/presentational/approver-req-trans-card";

interface RequestListProps {
  borrow_requests: IBorrowRequest[];
}

export default function ApproverReqTransList({ borrow_requests }: RequestListProps) {
  const { selectedFilterTab, filterOffice } = useTabsStore();
  const { searchQuery } = useSearch();

  const filteredRequests =

  return (
    <>
      {filteredRequests.map((borrow_request, index) => (
        <ApproverReqTransCard key={index} props={{ borrow_request }} />
      ))}
    </>
  );
}
