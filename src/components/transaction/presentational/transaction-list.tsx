import TransactionCard from '@/components/transaction/presentational/transaction-card';
import { ITransactionRequest } from '@/lib/interfaces/get-office-transaction-interface';
import { useSearch } from '@/hooks/borrow/useSearch';
import TransactionListSkeleton from '@/components/transaction/presentational/transaction-card-skeleton';

interface TransactionListProps {
    transactions: ITransactionRequest[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
    const { searchQuery } = useSearch();

    const filteredTransactions = transactions
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

    if (!filteredTransactions.length) {
        return (
            <div className='text-center text-muted-foreground col-span-full'>
                <TransactionListSkeleton />
            </div>
        );
    }

    return (
        <>
            {filteredTransactions.map((transactions) => (
                <TransactionCard key={transactions.id} transaction={transactions} /> 
            ))}
        </>
    );
}
