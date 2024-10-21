import TransactionCard from '@/components/transaction/presentational/transaction-card';
import { ITransactionRequest } from '@/lib/interfaces/get-office-transaction-interface';
import { useSearch } from '@/hooks/borrow/useSearch';
import TransactionListSkeleton from '@/components/transaction/presentational/transaction-card-skeleton';
import { useTabsStore } from '@/hooks/request/useTabs';

interface TransactionListProps {
    transactions: ITransactionRequest[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
    const { searchQuery } = useSearch();
    const { activeTab } = useTabsStore();

    const filteredTransactions = transactions
        .filter((transaction) => {
            // Filter based on activeTab (status)
            const matchesStatus = activeTab === 'ALL' 
                ? true 
                : transaction.status === activeTab;

            // Filter based on search query
            const matchesSearch = searchQuery
                ? transaction.custom_transac_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (transaction.status && transaction.status.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;

            return matchesStatus && matchesSearch;
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
                No results found
            </div>
        );
    }

    return (
        <>
            {filteredTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} /> 
            ))}
        </>
    );
}
