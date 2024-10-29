import {useEffect, useState} from "react";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";
import {useTransactionStore} from "@/hooks/stores/useTransactionStore";
import {usePenalizedTransactionPagination} from "@/core/data-access/requests";
import {handleApiClientSideError} from "@/core/handle-api-client-side-error";

export const usePenalizedTransaction = (page: number) => {
    const [officeTransaction, setOfficeTransaction] = useState<ITransactionRequest[] | [] | undefined>([]);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const [isFetchingOfficeTransaction, setIsFetchingOfficeTransaction] = useState(false);
    const {data, isLoading} = usePenalizedTransactionPagination(page);

    const {addRequestsByPage, getRequestsByPage} = useTransactionStore();

    useEffect(() => {
        async function loadRequests(page: number) {
            setIsFetchingOfficeTransaction(true);
            const existingPage = getRequestsByPage("penalized-transaction", page);
            if (existingPage) {
                setOfficeTransaction(existingPage);
                setIsFetchingOfficeTransaction(false);
            } else {
                setIsFetchingOfficeTransaction(isLoading);
                const officeTransactionData = data?.data?.data;
                if (data) {
                    handleApiClientSideError(data);
                }
                setOfficeTransaction(officeTransactionData?.transactions);
                addRequestsByPage("penalized-transaction", page, officeTransactionData?.transactions);
                setTotalPages(officeTransactionData?.last_page);
                setIsFetchingOfficeTransaction(isLoading);
            }
        }

        loadRequests(page);
    }, [page, data, isLoading]);

    return {
        officeTransaction,
        isFetchingOfficeTransaction,
        totalPages,
    };
};

