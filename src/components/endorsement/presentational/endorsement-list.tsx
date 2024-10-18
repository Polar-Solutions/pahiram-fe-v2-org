import {ITransactionRequest} from '@/lib/interfaces/get-office-transaction-interface';
import {useSearch} from '@/hooks/borrow/useSearch';
import EndorsementCard from "@/components/endorsement/presentational/endorsement-card";

interface TransactionListProps {
    endorsements: ITransactionRequest[];
}

export default function EndorsementList({endorsements}: TransactionListProps) {
    const {searchQuery} = useSearch();

    const filteredEndorsements = endorsements
        .filter((transaction) => {
            const matchesSearch = searchQuery
                ? transaction.custom_transac_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (transaction.borrower && transaction.borrower.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;

            return matchesSearch;
        })
        .sort((a, b) => {
            const dateComparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            return dateComparison === 0
                ? a.custom_transac_id.localeCompare(b.custom_transac_id)
                : dateComparison;
        });

    if (!filteredEndorsements.length) {
        return (
            <div className='text-center text-muted-foreground col-span-full'>
                No results found
            </div>
        );
    }

    return (
        <>
            {filteredEndorsements.map((endorsement) => (
                <EndorsementCard key={endorsement.id} endorsement={endorsement}/>
            ))}
        </>
    );
}
