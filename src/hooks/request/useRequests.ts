import { useEffect, useRef, useState } from "react";
import { getBorrowRequestsPaginationUseCase } from "@/core/use-cases/requests";
import { IBorrowRequest } from "@/lib/interfaces";

export const useRequests = (page: number) => {
    const [requests, setRequests] = useState<IBorrowRequest[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingRequests, setIsFetchingRequests] = useState(false);
    
    // Use a ref to store cached requests per page
    const cachedRequests = useRef<{ [page: number]: IBorrowRequest[] }>({});
    
    useEffect(() => {
        async function loadRequests(page: number) {
        if (cachedRequests.current[page]) {
            setRequests(cachedRequests.current[page]);
        } else {
            try {
                setIsFetchingRequests(true);
                const response = await getBorrowRequestsPaginationUseCase(page);
                const requestsPaginationData = response?.data;
    
                setRequests(requestsPaginationData?.borrow_requests);
                cachedRequests.current[page] = requestsPaginationData?.borrow_requests; // Cache requests per page
                setTotalPages(requestsPaginationData?.last_page);
            } catch (error) {
                console.error("Error fetching requests:", error);
                // Handle error (e.g., show error message to user)
            } finally {
            setIsFetchingRequests(false);
            }
        }
        }
    
        loadRequests(page);
    }, [page]);
    
    return {
        requests,
        isFetchingRequests,
        totalPages,
    };
    }