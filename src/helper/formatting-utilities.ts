const formatBorrowPurpose = (purpose: string): string => {
    return purpose
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
};

const formatBorrowStatus = (status: string | null | undefined): { formattedStatus: string, badgeClass: string } => {
  // Ensure status is a valid string, defaulting to "Unknown" if it's null or undefined
  if (!status) {
    return { formattedStatus: "Unknown", badgeClass: 'bg-gray-200 text-gray-800 text-center' };
  }

  // Format the status string by replacing underscores and capitalizing words
  let formattedStatus = status
    .replace(/_/g, ' ') // Replace underscores with spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word

  // Map specific statuses to simplified versions like "Pending"
  const pendingStatuses = ["PENDING_BORROWING_APPROVAL", "PENDING_ENDORSER_APPROVAL", "PENDING_APPROVAL"];
  if (pendingStatuses.includes(status)) {
    formattedStatus = "Pending";
  }

  // Determine the badge class based on the status
  let badgeClass = 'bg-gray-200 text-gray-800 text-center font-light'; 

  const warningStatuses = ["UNRETURNED", "CANCELLED", "DISAPPROVED"];
  if (warningStatuses.includes(status)) {
    badgeClass = 'bg-red-500 text-white'; // Style for critical or negative statuses
  } else if (pendingStatuses.includes(status)) {
    badgeClass = 'bg-yellow-500 text-black font-light'; // Style for pending statuses
  } else if (status === "APPROVED") {
    badgeClass = 'bg-green-500 text-black font-light'; // Style for approved status
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
