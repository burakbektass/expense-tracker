'use client';

import { useState } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useCategories } from '@/context/CategoryContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatMoney } from '@/lib/formatUtils';

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction, isLoading } = useTransactions();
  const { categories } = useCategories();
  const { currency, convertAmount } = useCurrency();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense' as const,
    categoryId: '',
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTransaction.description && newTransaction.amount && newTransaction.categoryId) {
      addTransaction({
        description: newTransaction.description,
        amount: Number(newTransaction.amount),
        type: newTransaction.type,
        categoryId: newTransaction.categoryId,
        currency: currency.code
      });
      
      setNewTransaction({
        description: '',
        amount: '',
        type: 'expense',
        categoryId: '',
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Transactions</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Transaction
        </button>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="p-6 space-y-4">
          {transactions.map((transaction) => {
            const category = categories.find(c => c.id === transaction.categoryId);
            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-foreground-5 hover:bg-foreground-10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {category?.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.description}</h3>
                    <p className="text-sm opacity-60">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                    {currency.symbol}
                    {formatMoney(
                      transaction.currency === currency.code
                        ? Math.abs(transaction.amount)
                        : convertAmount(Math.abs(transaction.amount), transaction.currency || 'USD')
                    )}
                  </span>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block mb-2">Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block mb-2">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })}
                  className="select-field"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Category</label>
                <select
                  value={newTransaction.categoryId}
                  onChange={(e) => setNewTransaction({ ...newTransaction, categoryId: e.target.value })}
                  className="select-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}