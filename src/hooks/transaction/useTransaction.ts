import { useEffect, useRef, useState } from "react";
import {getTransctionRequestPaginationUseCase }from "@/core/use-cases/requests"
import { ITransactionRequest } from "@/lib/interfaces/get-office-transaction-interface";

export const useTransaction = (page: number) => {
    const [officeTransaction, setOfficeTransaction] = useState<ITransactionRequest[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingOfficeTransaction, setIsFetchingOfficeTransaction] = useState(false);
    
    // Use a ref to store cached requests per page
    const cachedRequests = useRef<{ [page: number]: ITransactionRequest[] }>({});
    
    useEffect(() => {
        async function loadRequests(page: number) {
        if (cachedRequests.current[page]) {
            setOfficeTransaction(cachedRequests.current[page]);
        } else {
            try {
                setIsFetchingOfficeTransaction(true);
                const response = await getTransctionRequestPaginationUseCase(page);
                const officeTransactionPaginationData = response?.data;
    
                setOfficeTransaction(officeTransactionPaginationData?.transactions);
                cachedRequests.current[page] = officeTransactionPaginationData?.transactions; // Cache requests per page
                setTotalPages(officeTransactionPaginationData?.last_page);
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