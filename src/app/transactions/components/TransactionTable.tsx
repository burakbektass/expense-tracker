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
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left w-[25%]">Category</th>
            <th className="p-4 text-left w-[25%]">Description</th>
            <th className="p-4 text-left w-[15%]" onClick={() => handleSort('date')}>
              <div className="flex items-center">
                Date
                <SortIcon active={sortField === 'date'} direction={sortDirection} />
              </div>
            </th>
            <th className="p-4 text-left w-[10%]">Type</th>
            <th className="p-4 text-right w-[15%]" onClick={() => handleSort('amount')}>
              <div className="flex items-center justify-end">
                Amount
                <SortIcon 
                  active={sortField === 'amount'} 
                  direction={sortField === 'amount' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th className="p-4 text-center w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => {
            const category = categories.find(c => c.id === transaction.categoryId);
            return (
              <tr key={transaction.id} className="border-b border-border hover:bg-foreground/5">
                <td className="p-4">
                  <div className="flex items-center gap-2 relative group">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      {category?.icon}
                    </span>
                    <span className="truncate">{category?.name}</span>
                    {(category?.name?.length || 0) > 15 && (
                      <div className="absolute hidden group-hover:block left-0 -top-8 bg-black text-white text-sm rounded-lg px-2 py-1 whitespace-nowrap z-10">
                        {category?.name}
                        <div className="absolute left-4 top-full -mt-1 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative group">
                    <span className="truncate block">{transaction.description}</span>
                    {transaction.description.length > 30 && (
                      <div className="absolute hidden group-hover:block left-0 -top-8 bg-black text-white text-sm rounded-lg px-2 py-1 whitespace-nowrap z-10">
                        {transaction.description}
                        <div className="absolute left-4 top-full -mt-1 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                </td>
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
                      : convertAmount(Math.abs(transaction.amount), transaction.currency)
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