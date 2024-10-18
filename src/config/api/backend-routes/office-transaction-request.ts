export const getOfficeTransactionListEndpoint = (page: number) => {
    return `/office/borrow-transaction?page=${page}`;
};

export const approveTransactionEndpoint = (resourceId: string | undefined) => {
    const endpoint = `/office/transaction/${resourceId}/borrow-approval`;
    return endpoint;
};