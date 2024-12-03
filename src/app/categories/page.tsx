"use client";

import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { useCategories } from "@/context/CategoryContext";
import { useCurrency } from "@/context/CurrencyContext";
import { formatMoney } from "@/lib/formatUtils";
import { CategoryTable } from "@/app/categories/components/CategoryTable";

export default function Categories() {
  const {
    categories,
    addCategory,
    deleteCategory,
    getCategoryTotals,
    getCategoryTransactionCount,
    hasReachedLimit,
    updateCategory,
  } = useCategories();
  const { transactions, deleteTransactionsByCategory } = useTransactions();
  const { currency, convertAmount } = useCurrency();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{
    show: boolean;
    categoryId: string;
  }>({ show: false, categoryId: "" });
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "📦",
    budget: null as number | null,
  });
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    icon: string;
    budget: number | null;
  } | null>(null);

  const categoryTotals = getCategoryTotals(transactions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory(newCategory.name, newCategory.icon, newCategory.budget);
      setNewCategory({ name: "", icon: "📦", budget: null });
      setShowAddModal(false);
    }
  };

  const handleDeleteClick = (categoryId: string) => {
    const transactionCount = getCategoryTransactionCount(
      transactions,
      categoryId
    );
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
    setShowDeleteModal({ show: false, categoryId: "" });
  };

  const handleEditClick = (category) => {
    setEditingCategory({
      ...category,
      budget: category.budget ? convertAmount(category.budget) : null,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      const budget = editingCategory.budget
        ? convertAmount(Number(editingCategory.budget), currency.code, "USD")
        : null;

      updateCategory(editingCategory.id, {
        ...editingCategory,
        budget,
      });
      setShowEditModal(false);
      setEditingCategory(null);
    }
  };

  const formatInputValue = (value: number | null): string => {
    if (value === null) return "";
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const numberValue = value ? Number(value) : null;
    setEditingCategory((prev) =>
      prev ? { ...prev, budget: numberValue } : null
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Categories</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-foreground/5 transition-colors"
          >
            {viewMode === "card" ? (
              <>
                <span>📊</span>
                View as Table
              </>
            ) : (
              <>
                <span>📇</span>
                View as Cards
              </>
            )}
          </button>
          <div className="flex flex-col items-end gap-2">
            {hasReachedLimit && (
              <p className="text-sm text-yellow-500">
                Maximum category limit (20) reached
              </p>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={hasReachedLimit}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-2xl border border-border overflow-hidden">
          <CategoryTable
            categories={categoryTotals}
            currency={currency}
            convertAmount={convertAmount}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTotals.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl border border-border bg-background/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-20 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{category.name}</h3>
                      {category.budget && category.budgetWarning && (
                        <div className="relative group">
                          <span className="text-yellow-500 animate-pulse cursor-pointer">⚠️</span>
                          <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                            {`Warning: Expenses have reached ${(
                              (Math.abs(convertAmount(category.totalExpense) - convertAmount(category.totalIncome)) / 
                              (convertAmount(category.budget || 1))
                            * 100).toFixed(0))}% of budget`}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-black"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm opacity-60">
                        {category.budget 
                          ? `Budget: ${currency.symbol}${formatMoney(convertAmount(category.budget))}` 
                          : "No budget set"}
                      </p>
                      <p className="text-sm text-green-500">
                        Income: {currency.symbol}
                        {formatMoney(convertAmount(category.totalIncome))}
                      </p>
                      <p className="text-sm text-red-500">
                        Expenses: {currency.symbol}
                        {formatMoney(convertAmount(category.totalExpense))}
                      </p>
                      <p className="text-sm font-medium">
                        Balance: {currency.symbol}
                        {formatMoney(
                          convertAmount(
                            category.totalIncome - category.totalExpense
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal.show && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
            <p className="mb-4">
              This category has associated transactions. Deleting it will also
              delete all related transactions. Are you sure you want to
              continue?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowDeleteModal({ show: false, categoryId: "" })
                }
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
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="input-field"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block mb-2">Icon</label>
                <select
                  value={newCategory.icon}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, icon: e.target.value })
                  }
                  className="input-field"
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
              <div>
                <label className="block mb-2">Budget (Optional)</label>
                <input
                  type="number"
                  value={newCategory.budget || ""}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      budget: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="input-field"
                  placeholder="Enter budget amount (optional)"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategory({ name: "", icon: "📦", budget: null });
                  }}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="button-primary">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={editingCategory?.name}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                  className="input-field"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block mb-2">Icon</label>
                <select
                  value={editingCategory?.icon}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, icon: e.target.value } : null
                    )
                  }
                  className="input-field"
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
              <div>
                <label className="block mb-2">Budget (Optional)</label>
                <input
                  type="text"
                  value={
                    editingCategory?.budget
                      ? formatInputValue(editingCategory.budget)
                      : ""
                  }
                  onChange={handleBudgetChange}
                  className="input-field"
                  placeholder="Enter budget amount (optional)"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCategory(null);
                  }}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="button-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
