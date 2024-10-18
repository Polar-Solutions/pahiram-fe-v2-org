import {useEffect, useRef, useState} from "react";
import {getEndorsementTransactionPaginationUseCase} from "@/core/use-cases/requests"
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";

export const useEndorsements = (page: number) => {
    const [endorsementTransaction, setEndorsementTransaction] = useState<ITransactionRequest[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingEndorsementTransaction, setIsFetchingEndorsementTransaction] = useState(false);

    // Use a ref to store cached requests per page

    const {addRequestsByPage, getRequestsByPage} = useTransactionStore();

    useEffect(() => {
        async function loadRequests(page: number) {
            const existingPage = getRequestsByPage("endorsement", page);
            if (existingPage) {
                setEndorsementTransaction(existingPage);
            } else {
                try {
                    setIsFetchingEndorsementTransaction(true);
                    const response = await getEndorsementTransactionPaginationUseCase(page);
                    const endorsementTransactionData = response?.data;

                    setEndorsementTransaction(endorsementTransactionData?.endorsements);
                    addRequestsByPage("endorsement", page, endorsementTransactionData?.endorsements);
                    setTotalPages(endorsementTransactionData?.last_page);
                } catch (error) {
                    console.error("Error fetching requests:", error);
                    // Handle error (e.g., show error message to user)
                } finally {
                    setIsFetchingEndorsementTransaction(false);
                }
            }
        }

        loadRequests(page);
    }, [page]);

    return {
        endorsementTransactions: endorsementTransaction,
        isFetchingEndorsementTransaction,
        totalPages,
    };
}