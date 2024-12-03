import { formatMoney } from "@/lib/formatUtils";
import { useState } from 'react';

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

type SortField = 'name' | 'budget' | 'income' | 'expense' | 'balance';
type SortDirection = 'asc' | 'desc' | 'none';

export function CategoryTable({
  categories,
  currency,
  convertAmount,
  onDelete,
  onEdit,
}) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection('none');
        setSortField('name');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortDirection === 'none') return 0;
    
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'budget':
        const budgetA = a.budget ? convertAmount(a.budget) : 0;
        const budgetB = b.budget ? convertAmount(b.budget) : 0;
        return multiplier * (budgetA - budgetB);
      case 'income':
        return multiplier * (convertAmount(a.totalIncome) - convertAmount(b.totalIncome));
      case 'expense':
        return multiplier * (convertAmount(a.totalExpense) - convertAmount(b.totalExpense));
      case 'balance':
        const balanceA = convertAmount(a.totalIncome - a.totalExpense);
        const balanceB = convertAmount(b.totalIncome - b.totalExpense);
        return multiplier * (balanceA - balanceB);
      default:
        return multiplier * a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left" style={{ width: '20%' }}>Category</th>
            <th 
              className="p-4 text-right pr-10 cursor-pointer hover:bg-foreground/5" 
              style={{ width: '20%' }}
              onClick={() => handleSort('budget')}
            >
              <div className="flex items-center justify-end">
                Budget
                <SortIcon 
                  active={sortField === 'budget'} 
                  direction={sortField === 'budget' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th 
              className="p-4 text-right cursor-pointer hover:bg-foreground/5" 
              style={{ width: '15%' }}
              onClick={() => handleSort('income')}
            >
              <div className="flex items-center justify-end">
                Income
                <SortIcon 
                  active={sortField === 'income'} 
                  direction={sortField === 'income' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th 
              className="p-4 text-right cursor-pointer hover:bg-foreground/5" 
              style={{ width: '15%' }}
              onClick={() => handleSort('expense')}
            >
              <div className="flex items-center justify-end">
                Expenses
                <SortIcon 
                  active={sortField === 'expense'} 
                  direction={sortField === 'expense' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th 
              className="p-4 text-right cursor-pointer hover:bg-foreground/5" 
              style={{ width: '15%' }}
              onClick={() => handleSort('balance')}
            >
              <div className="flex items-center justify-end">
                Balance
                <SortIcon 
                  active={sortField === 'balance'} 
                  direction={sortField === 'balance' ? sortDirection : 'none'} 
                />
              </div>
            </th>
            <th className="p-4 text-center" style={{ width: '15%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-border hover:bg-foreground/5"
            >
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </div>
              </td>
              <td className="p-4 text-right text-gray-500">
                <div className="flex items-center justify-end gap-2 min-w-[200px]">
                  <div className="flex-1 text-right pr-1">
                    <span className="tabular-nums">
                      {category.budget
                        ? `${currency.symbol}${formatMoney(
                            convertAmount(category.budget)
                          )}`
                        : "No budget"}
                    </span>
                  </div>
                  <div className="w-6 flex justify-center">
                    {category.budget && category.budgetWarning && (
                      <div className="relative group">
                        <span className="text-yellow-500 animate-pulse cursor-pointer">⚠️</span>
                        <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                          {`Warning: Expenses have reached ${(
                            (Math.abs(
                              convertAmount(category.totalExpense) -
                              convertAmount(category.totalIncome)
                            ) /
                              convertAmount(category.budget || 1)) *
                            100
                          ).toFixed(0)}% of budget`}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4 text-right text-green-500">
                {currency.symbol}
                {formatMoney(convertAmount(category.totalIncome))}
              </td>
              <td className="p-4 text-right text-red-500">
                {currency.symbol}
                {formatMoney(convertAmount(category.totalExpense))}
              </td>
              <td className="p-4 text-right font-medium">
                {currency.symbol}
                {formatMoney(
                  convertAmount(category.totalIncome - category.totalExpense)
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
