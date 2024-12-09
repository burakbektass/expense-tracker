'use client';

import { createContext, useContext, useEffect, useState } from 'react'; 
import { Transaction } from '@/context/TransactionContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

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

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { currency, convertAmount } = useCurrency();

  useEffect(() => {
    const defaultCategories = [
      { id: 'groceries', name: t('defaultCategories.groceries'), icon: '🛒', budget: 200 },
      { id: 'rent', name: t('defaultCategories.rent'), icon: '🏠', budget: 1000 },
      { id: 'utilities', name: t('defaultCategories.utilities'), icon: '💡', budget: null },
      { id: 'transportation', name: t('defaultCategories.transportation'), icon: '🚗', budget: 250 },
      { id: 'entertainment', name: t('defaultCategories.entertainment'), icon: '🎮', budget: 500 },
      { id: 'healthcare', name: t('defaultCategories.healthcare'), icon: '🏥', budget: 650 },
      { id: 'education', name: t('defaultCategories.education'), icon: '📚', budget: 1100 },
      { id: 'shopping', name: t('defaultCategories.shopping'), icon: '🛍️', budget: 2000 },
      { id: 'travel', name: t('defaultCategories.travel'), icon: '✈️', budget: null },
      { id: 'salary', name: t('defaultCategories.salary'), icon: '💰', budget: null },
      { id: 'investment', name: t('defaultCategories.investment'), icon: '📈', budget: 3000 },
      { id: 'other', name: t('defaultCategories.other'), icon: '📦', budget: null }
    ];

    if (categories.length === 0) {
      setCategories(defaultCategories);
    } else {
      setCategories(prevCategories => 
        prevCategories.map(category => {
          const defaultCategory = defaultCategories.find(dc => dc.id === category.id);
          if (defaultCategory) {
            return { ...category, name: defaultCategory.name };
          }
          return category;
        })
      );
    }
  }, [t]);

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

  const getCategoryTotals = (transactions: Transaction[]) => {
    return categories.map(category => {
      const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
      
      const totalIncome = categoryTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => {
          const amount = t.currency === currency.code 
            ? t.amount 
            : convertAmount(t.amount, t.currency);
          return sum + amount;
        }, 0);
      
      const totalExpense = categoryTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => {
          const amount = t.currency === currency.code 
            ? Math.abs(t.amount) 
            : convertAmount(Math.abs(t.amount), t.currency);
          return sum + amount;
        }, 0);

      return {
        ...category,
        totalIncome,
        totalExpense,
        budgetWarning: category.budget ? totalExpense >= category.budget * 0.8 : false
      };
    });
  };

  const getCategoryTransactionCount = (transactions: Transaction[], categoryId: string) => {
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