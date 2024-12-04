import { useState } from 'react';
import { formatMoney } from '@/lib/formatUtils';

type SortField = 'date' | 'amount';
type SortDirection = 'asc' | 'desc' | 'none';

const SortIcon = ({ active, direction }) => {
  if (!active) {
    return (
      <span className="ml-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6-6 6 6M6 15l6 6 6-6"/>
        </svg>
      </span>
    );
  }
  
  return (
    <span className="ml-2 text-blue-500">
      {direction === 'asc' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 15l6-6 6 6"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      )}
    </span>
  );
};

export function TransactionTable({ 
  transactions, 
  categories, 
  currency, 
  convertAmount, 
  onDelete 
}) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [amountSortCount, setAmountSortCount] = useState(0);

  const handleSort = (field: SortField) => {
    if (field === 'amount') {
      setAmountSortCount((prev) => (prev + 1) % 3);
      if (amountSortCount === 0) {
        setSortField('amount');
        setSortDirection('asc');
      } else if (amountSortCount === 1) {
        setSortDirection('desc');
      } else {
        setSortField('date');
        setSortDirection('desc');
        setAmountSortCount(0);
      }
    } else {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'date':
        return multiplier * (new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'amount':
        return multiplier * (Math.abs(a.amount) - Math.abs(b.amount));
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left cursor-pointer hover:bg-foreground/5" onClick={() => handleSort('date')}>
              <div className="flex items-center">
                Date
                <SortIcon active={sortField === 'date'} direction={sortDirection} />
              </div>
            </th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-right cursor-pointer hover:bg-foreground/5" onClick={() => handleSort('amount')}>
              <div className="flex items-center justify-end">
                Amount
                <SortIcon 
                  active={sortField === 'amount'} 
                  direction={sortField === 'amount' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th className="p-4 text-center w-20">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => {
            const category = categories.find(c => c.id === transaction.categoryId);
            return (
              <tr key={transaction.id} className="border-b border-border hover:bg-foreground/5">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      {category?.icon}
                    </span>
                    <span>{category?.name}</span>
                  </div>
                </td>
                <td className="p-4">{transaction.description}</td>
                <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </td>
                <td className={`p-4 text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {currency.symbol}
                  {formatMoney(
                    transaction.currency === currency.code
                      ? Math.abs(transaction.amount)
                      : convertAmount(Math.abs(transaction.amount), transaction.currency || 'USD')
                  )}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}