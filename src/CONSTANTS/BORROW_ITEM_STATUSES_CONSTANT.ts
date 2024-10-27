export const BORROWED_ITEM_STATUS = {
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    APPROVED: 'APPROVED',
    IN_POSSESSION: 'IN_POSSESSION',
    CANCELLED: 'CANCELLED',
    DISAPPROVED: 'DISAPPROVED',
    UNRELEASED: 'UNRELEASED',
    RETURNED: 'RETURNED',
    UNRETURNED: 'UNRETURNED',
    DAMAGED_BUT_REPAIRABLE: 'DAMAGED_BUT_REPAIRABLE',
    UNREPAIRABLE: 'UNREPAIRABLE',
    LOST: 'LOST',
  };
  
  export const BORROWED_ITEM_STATUS_ARRAY = [
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.PENDING_APPROVAL,
      item_status: 'Pending Approval',
      description: 'Item is awaiting approval',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.APPROVED,
      item_status: 'Approved',
      description: 'Item is approved',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.CANCELLED,
      item_status: 'Cancelled',
      description: 'Item is cancelled by borrower',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.DISAPPROVED,
    item_status: 'Disapproved',
      description: 'Item is declined to be borrowed',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.IN_POSSESSION,
        item_status: 'In Possession',
      description: 'Item currently borrowed',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.UNRELEASED,
      item_status: 'Unreleased',
      description: 'Item is not released to borrower',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.RETURNED,
        item_status: 'Returned',
      description: 'Item has been returned after a borrowing transaction',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.UNRETURNED,
        item_status: 'Unreturned',
      description: 'Item is unreturned',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.DAMAGED_BUT_REPAIRABLE,
        item_status: 'Damaged but repairable',
      description: 'Returned item requires repair / maintenance',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.UNREPAIRABLE,
        item_status: 'Unrepairable',
      description: 'Returned item beyond fixing',
    },
    {
      borrowed_item_status: BORROWED_ITEM_STATUS.LOST,
        item_status: 'Lost',
      description: 'Item is lost by the borrower',
    },
  ];
  
  export const RETURNED_STATUSES = [
    BORROWED_ITEM_STATUS.RETURNED,
    BORROWED_ITEM_STATUS.DAMAGED_BUT_REPAIRABLE,
    BORROWED_ITEM_STATUS.UNREPAIRABLE,
    BORROWED_ITEM_STATUS.LOST,
    BORROWED_ITEM_STATUS.UNRETURNED,
  ];
  