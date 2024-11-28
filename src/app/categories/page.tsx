'use client';

import { useState } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useCategories } from '@/context/CategoryContext';

export default function Categories() {
  const { categories, addCategory, deleteCategory, getCategoryTransactionCount, updateCategoryBudget } = useCategories();
  const { transactions, deleteTransactionsByCategory } = useTransactions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{show: boolean; categoryId: string}>({ show: false, categoryId: '' });
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📦' });
  const [editBudgetModal, setEditBudgetModal] = useState<{show: boolean; categoryId: string; currentBudget: number}>({ 
    show: false, 
    categoryId: '', 
    currentBudget: 0 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory(newCategory.name, newCategory.icon);
      setNewCategory({ name: '', icon: '📦' });
      setShowAddModal(false);
    }
  };

  const handleDeleteClick = (categoryId: string) => {
    const transactionCount = getCategoryTransactionCount(transactions, categoryId);
    if (transactionCount > 0) {
      setShowDeleteModal({ show: true, categoryId });
    } else {
      deleteCategory(categoryId);
    }
  };

  const handleConfirmDelete = () => {
    deleteCategory(showDeleteModal.categoryId, true, (categoryId) => {
      deleteTransactionsByCategory(categoryId);
    });
    setShowDeleteModal({ show: false, categoryId: '' });
  };

  const handleBudgetUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editBudgetModal.categoryId && editBudgetModal.currentBudget >= 0) {
      updateCategoryBudget(editBudgetModal.categoryId, editBudgetModal.currentBudget);
      setEditBudgetModal({ show: false, categoryId: '', currentBudget: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Categories</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Category
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-6 rounded-2xl border border-border bg-background/50 hover:bg-foreground/5 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm opacity-60">
                    Budget: {category.budget ? `$${category.budget.toFixed(2)}` : 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditBudgetModal({ 
                    show: true, 
                    categoryId: category.id, 
                    currentBudget: category.budget || 0 
                  })}
                  className="text-blue-500 hover:text-blue-600"
                >
                  💰
                </button>
                <button
                  onClick={() => handleDeleteClick(category.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal.show && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
            <p className="mb-4">
              This category has associated transactions. Deleting it will also delete all related transactions. 
              Are you sure you want to continue?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal({ show: false, categoryId: '' })}
                className="px-4 py-2 border border-border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block mb-2">Icon</label>
                <select
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  className="select-field"
                >
                  <option value="📦">📦 Box</option>
                  <option value="🛍️">🛍️ Shopping</option>
                  <option value="🍽️">🍽️ Food</option>
                  <option value="🚗">🚗 Transport</option>
                  <option value="🎮">🎮 Entertainment</option>
                  <option value="📃">📃 Bills</option>
                  <option value="🏥">🏥 Healthcare</option>
                  <option value="📚">📚 Education</option>
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
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editBudgetModal.show && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Set Budget</h2>
            <form onSubmit={handleBudgetUpdate} className="space-y-4">
              <div>
                <label className="block mb-2">Budget Amount</label>
                <input
                  type="number"
                  value={editBudgetModal.currentBudget}
                  onChange={(e) => setEditBudgetModal({
                    ...editBudgetModal,
                    currentBudget: parseFloat(e.target.value)
                  })}
                  className="input-field"
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditBudgetModal({ show: false, categoryId: '', currentBudget: 0 })}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="button-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}