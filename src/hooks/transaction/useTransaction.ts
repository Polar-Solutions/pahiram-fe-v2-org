import { useEffect, useState } from "react";
import { getTransactionRequestPaginationUseCase } from "@/core/use-cases/requests";
import { ITransactionRequest } from "@/lib/interfaces/get-office-transaction-interface";
import { useTransactionStore } from "@/hooks/stores/useTransactionStore";

export const useTransaction = (page: number, forceRefetch = false) => {
    const [officeTransaction, setOfficeTransaction] = useState<ITransactionRequest[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingOfficeTransaction, setIsFetchingOfficeTransaction] = useState(false);

    const { addRequestsByPage, getRequestsByPage } = useTransactionStore();

    useEffect(() => {
        async function loadRequests(page: number) {
            const existingPage = getRequestsByPage("transaction", page);
            if (existingPage && !forceRefetch) {
                setOfficeTransaction(existingPage);
            } else {
                try {
                    setIsFetchingOfficeTransaction(true);
                    // Use the forceRefetch parameter when fetching
                    const response = await getTransactionRequestPaginationUseCase(page, forceRefetch);
                    const officeTransactionData = response?.data;

                    setOfficeTransaction(officeTransactionData?.transactions);
                    addRequestsByPage("transaction", page, officeTransactionData?.transactions);
                    setTotalPages(officeTransactionData?.last_page);
                } catch (error) {
                    console.error("Error fetching requests:", error);
                } finally {
                    setIsFetchingOfficeTransaction(false);
                }
            }
        }

        loadRequests(page);
    }, [page, forceRefetch]);

    return {
        officeTransaction,
        isFetchingOfficeTransaction,
        totalPages,
    };
};
