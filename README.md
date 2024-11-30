# Modern Expense Tracker

A modern, responsive expense tracking application built with Next.js 14, React, TypeScript, and TailwindCSS. This application helps users manage their expenses and income with features like categorization, budgeting, currency conversion, and dark/light theme support.

## Features

- 💰 Track income and expenses
- 📊 Categorize transactions
- 📱 Responsive design
- 🌓 Dark/Light theme support
- 💵 Budget management
- 📈 Category-wise analytics
- 💾 Local storage persistence
- 🌍 Multi-currency support
- 💱 Real-time currency conversion
- 📊 Interactive charts and visualizations
- ⚠️ Budget warning system
- 📅 Monthly trend analysis
- 🎨 Dynamic color themes
- 🔍 Transaction filtering

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Charts**: Recharts
- **Font**: Geist Font Family
- **API Integration**: Exchange Rates API
- **Storage**: Local Storage
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/burakbektass/expense-tracker.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Main application pages and routing
- `src/components`: Reusable UI components
- `src/context`: React Context providers
- `src/lib`: Utility functions and API services
- `src/types`: TypeScript type definitions
- `src/hooks`: Custom React hooks
- `src/styles`: Global styles and Tailwind configuration

## Key Features Explained

### Transaction Management
- Add and delete transactions
- Categorize transactions
- Track income and expenses separately
- Transaction history with filtering
- Real-time currency conversion

### Category System
- Pre-defined default categories
- Custom category creation
- Budget setting for categories
- Category-wise transaction analysis
- Budget warning notifications
- Category icons and color coding

### Multi-Currency Support
- Support for 10+ major currencies
- Real-time exchange rate updates
- Automatic currency conversion
- Persistent currency preference
- Formatted currency display

### Dashboard Analytics
- Total balance overview
- Income and expense summaries
- Category-wise breakdowns
- Interactive pie charts for expense distribution
- Bar charts for monthly trends
- Budget utilization tracking
- Dynamic color themes based on data

### Theme Support
- Dark/Light mode toggle
- Persistent theme preference
- Smooth theme transitions
- Dynamic chart colors
- Responsive design elements

## API Integration

The application integrates with:
- Exchange Rates API for real-time currency conversion
- Local Storage API for data persistence
- Context API for state management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.