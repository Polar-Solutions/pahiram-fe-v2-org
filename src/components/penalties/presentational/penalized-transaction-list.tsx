import {ITransactionRequest} from '@/lib/interfaces/get-office-transaction-interface';
import {useSearch} from '@/hooks/borrow/useSearch';
import {useTabsStore} from '@/hooks/request/useTabs';
import PenalizedTransactionCard from "@/components/penalties/presentational/penalized-transaction-card";

interface TransactionListProps {
    transactions: ITransactionRequest[] | undefined;
}

export default function PenalizedTransactionList({transactions}: TransactionListProps) {
    const {searchQuery} = useSearch();
    const {activeTab} = useTabsStore();

    if (!transactions) {
        return (
            <div className='text-center text-muted-foreground col-span-full'>
                No results found
            </div>
        );
    }

    const filteredTransactions = transactions
        .filter((transaction) => {
            // Filter based on activeTab (status)
            const matchesStatus = activeTab === 'ALL'
                ? true
                : transaction.borrow_transaction_status === activeTab;

            // Filter based on search query
            const matchesSearch = searchQuery
                ? transaction.custom_transac_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (transaction.borrow_transaction_status && transaction.borrow_transaction_status.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <PenalizedTransactionCard key={transaction.id} transaction={transaction}/>
            ))}
        </>
    );
}
