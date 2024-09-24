const formatBorrowPurpose = (purpose: string): string => {
    return purpose
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

const formatBorrowStatus = (status: string): string => {
return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
};

export { formatBorrowPurpose, formatBorrowStatus };
