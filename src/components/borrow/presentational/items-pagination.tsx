import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ItemsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const ItemsPagination: React.FC<ItemsPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (page: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        onPageChange(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 ? (
                        <PaginationPrevious onClick={handlePageClick(currentPage - 1)} href={''} />
                    ) : (
                        <PaginationPrevious className="pointer-events-none opacity-50" href={''} />
                    )}
                </PaginationItem>

                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            isActive={currentPage === number}
                            className={currentPage === number ? 'pointer-events-none' : ''}
                            onClick={handlePageClick(number)} href={''}                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    {currentPage < totalPages ? (
                        <PaginationNext onClick={handlePageClick(currentPage + 1)} href={''} />
                    ) : (
                        <PaginationNext className="pointer-events-none opacity-50" href={''} />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default ItemsPagination;