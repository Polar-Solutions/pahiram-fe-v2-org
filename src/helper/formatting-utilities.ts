const formatBorrowPurpose = (purpose: string): string => {
    return purpose
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
};

const formatBorrowStatus = (status: string): { formattedStatus: string, badgeClass: string } => {
    let formattedStatus = status
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  
    // Check for specific statuses and return "Pending"
    if (status === "PENDING_BORROWING_APPROVAL" || status === "PENDING_ENDORSER_APPROVAL") {
      formattedStatus = "Pending";
    }
  
    // Determine the badge class based on the status
    let badgeClass = 'bg-gray-200 text-gray-800 text-center'; // Default style
    if (status === "UNRETURNED" || status === "CANCELLED" || status === "DISAPPROVED") {
      badgeClass = 'bg-red-500 text-white';
    }
  
    return { formattedStatus, badgeClass };
  };
  
  

export { formatBorrowPurpose, formatBorrowStatus };
