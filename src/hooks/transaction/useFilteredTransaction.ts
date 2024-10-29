import {useMemo} from "react";
import {getURLParams} from "@/helper/borrow/getURLParams";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";

export const useFilteredTransactions = ({transac_data}: { transac_data: ITransactionRequest[] | undefined }) => {
    const {filterSearch, filterTransactionStatus} = getURLParams();

    return useMemo(() => {
        if (!transac_data) return [];

        return transac_data.filter((transaction) => {
            // Check transaction status filter
            if (filterTransactionStatus && transaction.borrow_transaction_status !== filterTransactionStatus) {
                return false;
            }

            // Check search filter for borrower name
            if (filterSearch) {
                const searchLower = filterSearch.toLowerCase();
                return transaction.borrower.toLowerCase().includes(searchLower);
            }

            return true; // Return all if no filters applied
        });
    }, [transac_data, filterTransactionStatus, filterSearch]);
};
