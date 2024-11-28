'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type TransactionType = 'income' | 'expense';

type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
};

type TransactionContextType = {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    deleteTransaction: (id: string) => void;
    deleteTransactionsByCategory: (categoryId: string) => void;
    isLoading: boolean;
  };

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client tarafında localStorage'dan veriyi yükle
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Sadece client tarafında ve initial load tamamlandığında localStorage'a kaydet
    if (!isLoading) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const deleteTransactionsByCategory = (categoryId: string) => {
    setTransactions(transactions.filter(transaction => transaction.categoryId !== categoryId));
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      setTransactions,
      addTransaction, 
      deleteTransaction,
      deleteTransactionsByCategory,
      isLoading 
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};