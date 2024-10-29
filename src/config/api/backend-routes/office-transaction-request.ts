export const getOfficeTransactionListEndpoint = (page: number) => {
    return `/office/borrow-transaction?page=${page}`;
};

export const approveTransactionEndpoint = (resourceId: string | undefined) => {
    const endpoint = `/office/borrow-transaction/${resourceId}/borrow-approval`;
    return endpoint;
};

export const specificTransactionEndpoint = (resourceId: string | undefined) => {
    const endpoint = `/office/borrow-transaction/${resourceId}`;
    return endpoint;
};

export const releaseTransactionEndpoint = (resourceId: string | undefined) => {
    const endpoint = `/office/borrow-transaction/${resourceId}/release-item`;
    return endpoint;
};

export const specificTransactionItemsEndpoint = (resourceId: string | undefined) => {
   return `/borrow-transaction/${resourceId}/borrowed-items`;
}

export const specificPenalizedTransactionItemsEndpoint = (resourceId: string | undefined) => {
    return `/borrow-transaction/${resourceId}/borrowed-items?include-penalty-data=true`;
}

export const getPenalizedTransactionListEndpoint = (page: number) => {
    return `/office/penalized-borrow-transaction?page=${page}`;
}