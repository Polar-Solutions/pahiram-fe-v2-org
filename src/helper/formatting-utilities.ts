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

const checkTransactionStatus = (status: string): { transacStatus: string, canCancel: boolean, canEdit: boolean } => {
  const transacStatus = status;

  // Check if the transaction can be canceled
  const canCancel = transacStatus === 'PENDING_ENDORSER_APPROVAL' || transacStatus === 'PENDING_BORROWING_APPROVAL' || transacStatus === 'APPROVED';

  // Check if the transaction can be edited
  const isPendingBorrowingApproval = transacStatus === 'PENDING_BORROWING_APPROVAL';
  const isPendingEndorserApproval = transacStatus === 'PENDING_ENDORSER_APPROVAL';
  
  // If either of the conditions is true, then it can be edited
  const canEdit = isPendingBorrowingApproval || isPendingEndorserApproval;

  return { transacStatus, canCancel, canEdit };
};



  
  

export { formatBorrowPurpose, formatBorrowStatus, checkTransactionStatus };
