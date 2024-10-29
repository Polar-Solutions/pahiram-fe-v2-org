import {create} from "zustand";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";

interface TransactionStore {
    penalizedTransactionPages: { [page: number]: ITransactionRequest[] | undefined };
    endorsementPages: { [page: number]: ITransactionRequest[] | undefined  }; // Pages for endorsements
    transactionPages: { [page: number]: ITransactionRequest[] | undefined  }; // Pages for transactions
    addRequestsByPage: (grouping: "endorsement" | "transaction" | "penalized-transaction", page: number, transactions: ITransactionRequest[] | undefined) => void;
    getRequestsByPage: (grouping: "endorsement" | "transaction" | "penalized-transaction", page: number) => ITransactionRequest[] | undefined;
    removeRequest: (grouping: "endorsement" | "transaction" | "penalized-transaction", transactionId: string | undefined) => void;
    getRequestById: (grouping: "endorsement" | "transaction" | "penalized-transaction", transactionId: string) => ITransactionRequest | undefined;
    clearAllRequests: (grouping: "endorsement" | "transaction" | "penalized-transaction") => void;
}

// Create the Zustand store with persistence
export const useTransactionStore = create<TransactionStore>()(
    // persist(
    (set, get) => ({
        endorsementPages: {},  // Initial state for endorsement pages
        transactionPages: {},  // Initial state for transaction pages
        penalizedTransactionPages: {},  // Initial state for penalized transaction pages

        // Add requests by page, depending on the grouping (endorsement/transaction)
        addRequestsByPage: (grouping, page, transactions) => {
            set((state) => {
                const updatedPages = grouping === "endorsement"
                    ? {...state.endorsementPages, [page]: transactions} : grouping === "penalized-transaction"
                        ? {...state.penalizedTransactionPages, [page]: transactions}
                        : {...state.transactionPages, [page]: transactions};

                return grouping === "endorsement"
                    ? {endorsementPages: updatedPages} : grouping === "penalized-transaction"
                        ? {penalizedTransactionPages: updatedPages}
                        : {transactionPages: updatedPages};
            });
        },

        // Retrieve requests by page and grouping (endorsement/transaction)
        getRequestsByPage: (grouping, page) => {
            const {endorsementPages, transactionPages, penalizedTransactionPages} = get();
            return grouping === "endorsement"
                ? endorsementPages[page] : grouping === "penalized-transaction"
                    ? penalizedTransactionPages[page]
                    : transactionPages[page];
        },

        // Remove a request by ID, depending on the grouping (endorsement/transaction)
        removeRequest: (grouping, transactionId) => {
            set((state) => {
                const updatedPages = grouping === "endorsement"
                    ? {...state.endorsementPages} : grouping === "penalized-transaction"
                        ? {...state.penalizedTransactionPages}
                        : {...state.transactionPages};

                // Iterate through the selected grouping pages and remove the request by ID
                for (const page in updatedPages) {
                    if(!updatedPages[page]) continue;
                    updatedPages[page] = updatedPages[page].filter(
                        (transaction) => transaction.id !== transactionId
                    );
                }

                return grouping === "endorsement"
                    ? {endorsementPages: updatedPages} : grouping === "penalized-transaction"
                        ? {penalizedTransactionPages: updatedPages}
                        : {transactionPages: updatedPages};
            });
        },

        // Get a request by ID from a specific grouping (endorsement/transaction)
        getRequestById: (grouping, transactionId) => {
            const {endorsementPages, transactionPages, penalizedTransactionPages} = get();
            const selectedPages = grouping === "endorsement" ? endorsementPages : grouping === "penalized-transaction" ? penalizedTransactionPages : transactionPages;

            for (const page in selectedPages) {
                if(!selectedPages[page]) continue;
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
                penalizedTransactionPages: grouping === "penalized-transaction" ? {} : get().penalizedTransactionPages
            }));
        },
    })
    // {
    //     name: "grouped-transaction-storage", // Key for localStorage
    // }
    // )
);
