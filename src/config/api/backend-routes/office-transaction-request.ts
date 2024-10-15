export const getOfficeTransactionListEndpoint = (page: number) => {
    return `/office/borrow-transaction?page=${page}`;
};