import { useEffect, useRef, useState } from "react";
import {getTransactionRequestPaginationUseCase }from "@/core/use-cases/requests"
import { ITransactionRequest } from "@/lib/interfaces/get-office-transaction-interface";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";

export const useTransaction = (page: number) => {
    const [officeTransaction, setOfficeTransaction] = useState<ITransactionRequest[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingOfficeTransaction, setIsFetchingOfficeTransaction] = useState(false);
    
    const {addRequestsByPage, getRequestsByPage} = useTransactionStore();
    
    useEffect(() => {
        async function loadRequests(page: number) {
            const existingPage = getRequestsByPage("transaction", page);
            if (existingPage) {
                setOfficeTransaction(existingPage);
            } else {
                try {
                    setIsFetchingOfficeTransaction(true);
                    const response = await getTransactionRequestPaginationUseCase(page);
                    const officeTransactionData = response?.data;

                    setOfficeTransaction(officeTransactionData?.transactions);
                    addRequestsByPage("transaction", page, officeTransactionData?.transactions);
                    setTotalPages(officeTransactionData?.last_page);
                } catch (error) {
                    console.error("Error fetching requests:", error);
                    // Handle error (e.g., show error message to user)
                } finally {
                    setIsFetchingOfficeTransaction(false);
                }
            }
        }

        loadRequests(page);
    }, [page]);
    
    return {
        officeTransaction,
        isFetchingOfficeTransaction,
        totalPages,
    };
    }