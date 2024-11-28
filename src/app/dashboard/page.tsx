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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-background/50">
          <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
            [Chart Placeholder]
          </div>
        </div>
        
        <div className="p-6 rounded-2xl border border-border bg-background/50">
          <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
          <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
            [Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}