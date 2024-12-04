'use client';

import { useState } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useCategories } from '@/context/CategoryContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatMoney } from '@/lib/formatUtils';
import { TransactionTable } from './components/TransactionTable';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({
    description: '',
    amount: '',
    categoryId: ''
  });

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const validateForm = () => {
    const newErrors = {
      description: '',
      amount: '',
      categoryId: ''
    };

    // Description validation
    if (!newTransaction.description) {
      newErrors.description = 'Description is required';
    } else if (newTransaction.description.length < 3) {
      newErrors.description = 'Description must be at least 3 characters';
    } else if (newTransaction.description.length > 64) {
      newErrors.description = 'Description must be less than 64 characters';
    }

    // Amount validation
    if (!newTransaction.amount) {
      newErrors.amount = 'Amount is required';
    } else if (Number(newTransaction.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    // Category validation
    if (!newTransaction.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Transactions</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pr-10 rounded-lg border border-border bg-background"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Transaction
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <TransactionTable
          transactions={filteredTransactions}
          categories={categories}
          currency={currency}
          convertAmount={convertAmount}
          onDelete={deleteTransaction}
        />
      </div>

      {showAddModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Description</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => {
                      setNewTransaction({ ...newTransaction, description: e.target.value });
                      if (errors.description) {
                        setErrors({ ...errors, description: '' });
                      }
                    }}
                    className={`w-full p-2 pr-16 rounded-lg border ${
                      errors.description ? 'border-red-500' : 'border-border'
                    } bg-background`}
                    placeholder="Enter description"
                    maxLength={64}
                  />
                  <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm ${
                    newTransaction.description.length >= 55 ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                    {newTransaction.description.length}/64
                  </span>
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
                {newTransaction.description.length >= 64 && (
                  <p className="text-yellow-500 text-sm mt-1">
                    ⚠️ Maximum character limit reached
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => {
                    setNewTransaction({ ...newTransaction, amount: e.target.value });
                    if (errors.amount) {
                      setErrors({ ...errors, amount: '' });
                    }
                  }}
                  className={`w-full p-2 rounded-lg border ${
                    errors.amount ? 'border-red-500' : 'border-border'
                  } bg-background`}
                  placeholder="Enter amount"
                  step="0.01"
                  min="0"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ 
                    ...newTransaction, 
                    type: e.target.value as 'income' | 'expense' 
                  })}
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
                  onChange={(e) => {
                    setNewTransaction({ ...newTransaction, categoryId: e.target.value });
                    if (errors.categoryId) {
                      setErrors({ ...errors, categoryId: '' });
                    }
                  }}
                  className={`select-field ${
                    errors.categoryId ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setErrors({ description: '', amount: '', categoryId: '' });
                  }}
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