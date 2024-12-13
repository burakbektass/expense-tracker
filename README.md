# BudgetFlow - Personal Finance Tracker

A modern personal finance management application built with Next.js 14, focusing on intuitive budget tracking and financial analytics.

## Core Features

- 💰 Comprehensive transaction management
  - Income & expense tracking
  - Multi-currency support with real-time conversion
  - Detailed transaction history
  - Transaction search and filtering

- 📊 Advanced Data Visualization
  - Interactive pie charts for expense/income distribution
  - Monthly trend analysis with bar charts
  - Toggleable chart/table views
  - Percentage-based distribution analysis

- 🎯 Budget Management
  - Category-based budgeting
  - Budget warning system
  - Visual budget progress indicators
  - Automated budget notifications

- 🌍 Internationalization
  - Multi-language support (English/Turkish)
  - Localized number formatting
  - Currency conversion
  - Regional date formatting

- 🎨 User Experience
  - Dark/Light theme
  - Responsive design
  - Intuitive navigation
  - Real-time updates

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **State Management**: React Context
- **Storage**: Local Storage
- **Icons**: Emoji-based system

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/budgetflow.git
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                # Pages and routing
│   ├── dashboard/      # Dashboard views
│   ├── transactions/   # Transaction management
│   └── categories/     # Category management
├── components/         # Reusable components
├── context/           # State management
│   ├── CategoryContext
│   ├── TransactionContext
│   ├── CurrencyContext
│   └── LanguageContext
├── lib/               # Utilities
└── locales/           # Language files
```

## Key Features in Detail

### Financial Management
- Transaction tracking with detailed categorization
- Multiple currency support with automatic conversion
- Budget setting and monitoring per category
- Comprehensive financial overview dashboard

### Data Analysis
- Visual representation of expenses and income
- Monthly trend analysis
- Category-wise distribution
- Budget vs. actual spending comparison

### Category System
- Custom category creation
- Category-specific budgets
- Icon selection for categories
- Transaction count tracking per category

### Customization Options
- Language selection (EN/TR)
- Currency preference
- Theme switching (Dark/Light)
- Display preferences (Chart/Table views)

### Budget Monitoring
- Category-specific budget limits
- Visual warning system
- Progress tracking
- Overspending notifications

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License