import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";

interface TransactionStore {
    endorsementPages: { [page: number]: ITransactionRequest[] }; // Pages for endorsements
    transactionPages: { [page: number]: ITransactionRequest[] }; // Pages for transactions
    addRequestsByPage: (grouping: "endorsement" | "transaction", page: number, transactions: ITransactionRequest[]) => void;
    getRequestsByPage: (grouping: "endorsement" | "transaction", page: number) => ITransactionRequest[] | undefined;
    removeRequest: (grouping: "endorsement" | "transaction", transactionId: string) => void;
    getRequestById: (grouping: "endorsement" | "transaction", transactionId: string) => ITransactionRequest | undefined;
    clearAllRequests: (grouping: "endorsement" | "transaction") => void;
}

// Create the Zustand store with persistence
export const useTransactionStore = create<TransactionStore>()(
    persist(
        (set, get) => ({
            endorsementPages: {},  // Initial state for endorsement pages
            transactionPages: {},  // Initial state for transaction pages

            // Add requests by page, depending on the grouping (endorsement/transaction)
            addRequestsByPage: (grouping, page, transactions) => {
                set((state) => {
                    const updatedPages = grouping === "endorsement"
                        ? {...state.endorsementPages, [page]: transactions}
                        : {...state.transactionPages, [page]: transactions};

                    return grouping === "endorsement"
                        ? {endorsementPages: updatedPages}
                        : {transactionPages: updatedPages};
                });
            },

            // Retrieve requests by page and grouping (endorsement/transaction)
            getRequestsByPage: (grouping, page) => {
                const {endorsementPages, transactionPages} = get();
                return grouping === "endorsement"
                    ? endorsementPages[page]
                    : transactionPages[page];
            },

            // Remove a request by ID, depending on the grouping (endorsement/transaction)
            removeRequest: (grouping, transactionId) => {
                set((state) => {
                    const updatedPages = grouping === "endorsement"
                        ? {...state.endorsementPages}
                        : {...state.transactionPages};

                    // Iterate through the selected grouping pages and remove the request by ID
                    for (const page in updatedPages) {
                        updatedPages[page] = updatedPages[page].filter(
                            (transaction) => transaction.id !== transactionId
                        );
                    }

                    return grouping === "endorsement"
                        ? {endorsementPages: updatedPages}
                        : {transactionPages: updatedPages};
                });
            },

            // Get a request by ID from a specific grouping (endorsement/transaction)
            getRequestById: (grouping, transactionId) => {
                const {endorsementPages, transactionPages} = get();
                const selectedPages = grouping === "endorsement" ? endorsementPages : transactionPages;

                for (const page in selectedPages) {
                    const foundTransaction = selectedPages[page].find(
                        (transaction) => transaction.custom_transac_id === transactionId
                    );
                    if (foundTransaction) {
                        return foundTransaction;
                    }
                }
                return undefined;
            },

            // Clear all requests for the selected grouping (endorsement/transaction)
            clearAllRequests: (grouping) => {
                set(() => ({
                    endorsementPages: grouping === "endorsement" ? {} : get().endorsementPages,
                    transactionPages: grouping === "transaction" ? {} : get().transactionPages,
                }));
            },
        }),
        {
            name: "grouped-transaction-storage", // Key for localStorage
        }
    )
);
