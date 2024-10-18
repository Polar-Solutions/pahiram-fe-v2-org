export const REQUEST_TRANSACTION_STATUSES = {
    PENDING_ENDORSER_APPROVAL: "PENDING_ENDORSER_APPROVAL",
    PENDING_BORROWING_APPROVAL: "PENDING_BORROWING_APPROVAL",
    APPROVED: "APPROVED",
    ON_GOING: "ON_GOING",
    CANCELLED: "CANCELLED",
    DISAPPROVED: "DISAPPROVED",
    UNRELEASED: "UNRELEASED",
    UNRETURNED: "UNRETURNED",
    TRANSACTION_COMPLETE: "TRANSACTION_COMPLETE",
}
export const REQUEST_TRANSACTION_PROGRESS = [
    {
        progress: "Endorser Approval",
        statuses: [
            "PENDING_ENDORSER_APPROVAL",
        ]
    },
    {
        progress: "Officer Approval",
        statuses: [
            "PENDING_BORROWING_APPROVAL",
        ]
    },
    {
        progress: "Approved",
        statuses: [
            "APPROVED",
            "UNRELEASED",
        ]
    },
    {
        progress: "Active",
        statuses: [
            "ON_GOING",
            "UNRETURNED",
        ]
    },
    {
        progress: "Closed",
        statuses: [
            "CANCELLED",
            "DISAPPROVED",
            "TRANSACTION_COMPLETE",
        ]
    }

]