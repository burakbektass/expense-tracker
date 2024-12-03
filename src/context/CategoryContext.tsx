'use client';

import { createContext, useContext, useEffect, useState } from 'react'; 
import { Transaction } from '@/types/transaction';

type Category = {
  id: string;
  name: string;
  icon: string;
  budget: number | null;
};

type CategoryWithTotals = Category & {
  totalIncome: number;
  totalExpense: number;
  budgetWarning?: boolean;
};

const MAX_CATEGORIES = 20;

type CategoryContextType = {
    categories: Category[];
    addCategory: (name: string, icon: string, budget: number | null) => void;
    deleteCategory: (id: string, force?: boolean, onDelete?: (id: string) => void) => void;
    updateCategory: (id: string, updates: Partial<Category>) => void;
    getCategoryTotals: (transactions: Transaction[]) => CategoryWithTotals[];
    getCategoryTransactionCount: (transactions: Transaction[], categoryId: string) => number;
    hasReachedLimit: boolean;
    isLoading: boolean;
  };

const defaultCategories: Category[] = [
    { id: '1', name: 'Shopping', icon: '🛍️', budget: 400 },
    { id: '2', name: 'Food', icon: '🍽️', budget: 700 },
    { id: '3', name: 'Transport', icon: '🚗', budget: 350 },
    { id: '4', name: 'Entertainment', icon: '🎮', budget: 100 },
    { id: '5', name: 'Bills', icon: '📃', budget: 800 },
    { id: '6', name: 'Healthcare', icon: '🏥', budget: null },
    { id: '7', name: 'Education', icon: '📚', budget: 75 },
    { id: '8', name: 'Other', icon: '📦', budget: null },
  ];

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories, isLoading]);

  const hasReachedLimit = categories.length >= MAX_CATEGORIES;

  const addCategory = (name: string, icon: string, budget: number | null) => {
    if (hasReachedLimit) {
      return;
    }
    setCategories([...categories, { 
      id: Date.now().toString(), 
      name, 
      icon, 
      budget 
    }]);
  };

  const getCategoryTotals = (transactions: any[]) => {
    return categories.map(category => {
      const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
      const totalIncome = categoryTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = categoryTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const balance = totalIncome - totalExpense;
      
      let budgetWarning = false;
      if (category.budget) {
        if (balance < 0) {
          budgetWarning = Math.abs(balance) >= (category.budget * 0.8);
        }
      }
      
      return {
        ...category,
        totalIncome,
        totalExpense,
        budgetWarning,
        balance
      };
    });
  };

  const getCategoryTransactionCount = (transactions: any[], categoryId: string) => {
    return transactions.filter(t => t.categoryId === categoryId).length;
  };

  const deleteCategory = (id: string, deleteTransactions = false, onDeleteTransactions?: (categoryId: string) => void) => {
    if (deleteTransactions && onDeleteTransactions) {
      onDeleteTransactions(id);
    }
    setCategories(categories.filter(category => category.id !== id));
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updates } : category
    ));
  };

  return (
    <CategoryContext.Provider value={{ 
      categories, 
      addCategory, 
      deleteCategory,
      updateCategory,
      isLoading,
      getCategoryTotals,
      getCategoryTransactionCount,
      hasReachedLimit
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};