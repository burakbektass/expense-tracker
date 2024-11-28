'use client';

import { useCategories } from '@/context/CategoryContext';
import { useTransactions } from '@/context/TransactionContext';

export default function Dashboard() {
  const { getCategoryTotals } = useCategories();
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const categoryTotals = getCategoryTotals(transactions);
  const totalIncome = categoryTotals.reduce((sum, cat) => sum + cat.totalIncome, 0);
  const totalExpense = categoryTotals.reduce((sum, cat) => sum + cat.totalExpense, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-500">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Category Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTotals.map(category => (
            <div key={category.id} className="p-4 rounded-xl border border-border bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{category.name}</h3>
                    {category.budgetWarning && (
                      <div className="relative group">
                        <span className="text-yellow-500 animate-pulse cursor-pointer">⚠️</span>
                        <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap">
                          {`Warning: Expenses have reached ${((Math.abs(category.totalExpense - category.totalIncome) / (category.budget || 1)) * 100).toFixed(0)}% of budget`}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-black/80"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {category.budget && (
                    <p className="text-xs opacity-60">
                      Budget: ${category.budget.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-500">Income:</span>
                  <span className="font-medium">${category.totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-500">Expenses:</span>
                  <span className="font-medium">${category.totalExpense.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-1 border-t border-border">
                  <span>Balance:</span>
                  <span>${(category.totalIncome - category.totalExpense).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}