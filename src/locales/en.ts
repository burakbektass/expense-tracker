export const en = {
  common: {
    appName: 'BudgetFlow',
    loading: 'Loading...',
    cancel: 'Cancel',
    delete: 'Delete',
    save: 'Save',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    warning: 'Warning',
    characterLimit: 'Maximum character limit reached',
    actions: 'Actions',
    saveChanges: 'Save Changes',
    maxCharacterLimit: 'Maximum character limit reached',
  },
  navigation: {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    categories: 'Categories',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    currency: 'Currency',
    language: 'Language',
  },
  dashboard: {
    title: 'Dashboard',
    expenseDistribution: 'Expense Distribution',
    monthlyTrends: 'Monthly Trends',
    showChart: 'Show Chart',
    showTable: 'Show Table',
    totalBalance: 'Total Balance',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    category: 'Category',
    amount: 'Amount',
    percentage: 'Percentage',
    month: 'Month',
    income: 'Income',
    expenses: 'Expenses',
    noTransactions: 'No transactions found',
    budgetWarning: 'Warning: Expenses have reached {percent}% of budget',
    charts: {
      pieChart: {
        title: 'Expense Distribution',
        noData: 'No data available',
        legend: 'Categories',
        noExpenses: 'No expenses to display',
        noIncome: 'No income to display',
      },
      barChart: {
        title: 'Monthly Trends',
        noData: 'No data available',
        income: 'Income',
        expenses: 'Expenses',
        xAxis: 'Month',
        yAxis: 'Amount'
      },
      toggleView: {
        showChart: 'Show Chart',
        showTable: 'Show Table'
      }
    },
    incomeDistribution: 'Income Distribution',
    distribution: 'Distribution',
  },
  transactions: {
    title: 'Transactions',
    addTransaction: 'Add Transaction',
    addNewTransaction: 'Add New Transaction',
    cancel: 'Cancel',
    description: 'Description',
    amount: 'Amount',
    amountPlaceholder: 'Enter amount',
    type: 'Type',
    category: 'Category',
    selectCategory: 'Select a category',
    date: 'Date',
    income: 'Income',
    expense: 'Expense',
    searchTransactions: 'Search transactions...',
    noTransactions: 'No transactions found',
    deleteConfirm: 'Are you sure you want to delete this transaction?',
    actions: 'Actions',
    descriptionPlaceholder: 'Enter description',
    validation: {
      descriptionRequired: 'Description is required',
      descriptionLength: 'Description must be between 3 and 64 characters',
      amountRequired: 'Amount is required',
      amountPositive: 'Amount must be greater than 0',
      amountMax: 'Amount cannot exceed 1,000,000,000',
      categoryRequired: 'Category is required',
      dateRequired: 'Date is required',
      maxCharacterLimit: 'Maximum character limit reached',
      descriptionMax: 'Description must be less than 64 characters',
    },
    deleteAll: 'Delete All',
    deleteAllTitle: 'Delete All Transactions',
    deleteAllConfirm: 'Are you sure you want to delete all transactions? This action cannot be undone.',
  },
  categories: {
    title: 'Categories',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    deleteCategory: 'Delete Category',
    name: 'Name',
    namePlaceholder: 'Enter category name',
    icon: 'Icon',
    budget: 'Budget',
    budgetOptional: 'Budget (Optional)',
    budgetPlaceholder: 'Enter budget amount (optional)',
    noBudget: 'No budget set',
    income: 'Income',
    expenses: 'Expenses',
    balance: 'Balance',
    actions: 'Actions',
    searchCategories: 'Search categories...',
    noCategories: 'No categories found',
    viewMode: {
      card: 'Card View',
      table: 'Table View'
    },
    deleteWarning: 'This category has associated transactions. Deleting it will also delete all related transactions. Are you sure you want to continue?',
    maxLimitReached: 'Maximum character limit reached',
    characterCount: '{current}/{max}',
    budgetPrefix: 'Budget: ',
    incomePrefix: 'Income: ',
    expensesPrefix: 'Expenses: ',
    balancePrefix: 'Balance: ',
    validation: {
      nameRequired: 'Name is required',
      nameLength: 'Name must be between 3 and 32 characters',
      budgetPositive: 'Budget must be greater than 0',
      budgetMax: 'Budget cannot exceed 1,000,000,000',
    },
    viewAsTable: 'View as Table',
    viewAsCards: 'View as Cards',
    categoryLimit: 'Maximum category limit (20) reached',
    form: {
      name: 'Name',
      namePlaceholder: 'Enter category name',
      icon: 'Icon',
      budget: 'Budget',
      budgetPlaceholder: 'Enter budget amount (optional)',
      budgetOptional: 'Budget (Optional)',
      validation: {
        nameRequired: 'Name is required',
        nameMinLength: 'Name must be at least 3 characters',
        nameMaxLength: 'Name must be less than 64 characters',
        budgetMax: 'Budget cannot exceed 100,000,000,000',
      }
    },
    modal: {
      addTitle: 'Add New Category',
      editTitle: 'Edit Category',
    },
    table: {
      category: 'Category',
      budget: 'Budget',
      income: 'Income',
      expenses: 'Expenses',
      balance: 'Balance',
      actions: 'Actions',
      noBudget: 'No budget',
      budgetWarning: 'Warning: Expenses have reached {percent}% of budget'
    },
    icons: {
      box: '📦 Box',
      shopping: '🛍️ Shopping',
      food: '🍽️ Food',
      transport: '🚗 Transport',
      entertainment: '🎮 Entertainment',
      bills: '📃 Bills',
      healthcare: '🏥 Healthcare',
      education: '📚 Education',
    },
    deleteAllTitle: 'Delete All Categories',
    deleteAllConfirm: 'Are you sure you want to delete all categories and their associated transactions? This action cannot be undone.',
    budgetWarnings: {
      warning: 'Budget Warning',
      exceeded: 'Budget exceeded by {amount}',
      approaching: 'Approaching budget limit ({percent}% used)',
    },
    deleteConfirm: 'Are you sure you want to delete this category ?',
  },
  defaultCategories: {
    groceries: 'Groceries',
    rent: 'Rent',
    utilities: 'Utilities',
    transportation: 'Transportation',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    education: 'Education',
    shopping: 'Shopping',
    travel: 'Travel',
    salary: 'Salary',
    investment: 'Investment',
    other: 'Other'
  }
}; 