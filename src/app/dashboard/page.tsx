'use client';

import { useCategories } from '@/context/CategoryContext';
import { useTransactions } from '@/context/TransactionContext';
import { useTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { generateColors, generateBarColors } from '@/lib/colorUtils';
import { formatMoney } from '@/lib/formatUtils';
import { useState } from 'react';
import { ExpenseTable } from './components/ExpenseTable';
import { TrendTable } from './components/TrendTable';

// Add this interface near the top of the file
interface MonthlyData {
  income: number;
  expense: number;
}

export default function Dashboard() {
  const { getCategoryTotals } = useCategories();
  const { transactions, isLoading } = useTransactions();
  const { theme } = useTheme();
  const { currency, convertAmount } = useCurrency();
  const [showPieAsTable, setShowPieAsTable] = useState(false);
  const [showBarAsTable, setShowBarAsTable] = useState(false);

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const categoryTotals = getCategoryTotals(transactions);
  const totalIncome = categoryTotals.reduce((sum, cat) => sum + cat.totalIncome, 0);
  const totalExpense = categoryTotals.reduce((sum, cat) => sum + cat.totalExpense, 0);
  const balance = totalIncome - totalExpense;

  // Prepare data for pie chart (expense distribution)
  const pieChartData = categoryTotals
    .filter(cat => cat.totalExpense > 0)
    .map(cat => ({
      name: cat.name,
      value: convertAmount(cat.totalExpense)
    }));

  // Generate colors dynamically based on the number of categories with expenses
  const pieColors = generateColors(pieChartData.length, theme);
  const barColors = generateBarColors(theme);

  // Prepare data for bar chart (monthly trends)
  const monthlyData = transactions.reduce<Record<string, MonthlyData>>((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 };
    }
    
    const convertedAmount = convertAmount(transaction.amount);
    if (transaction.type === 'income') {
      acc[monthYear].income += convertedAmount;
    } else {
      acc[monthYear].expense += convertedAmount;
    }
    
    return acc;
  }, {});

  const barChartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    Income: data.income,
    Expenses: data.expense
  }));

  // Custom tooltip formatter for the bar chart
  const barTooltipFormatter = (value: number) => {
    return `${currency.symbol}${formatMoney(value)}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold">{currency.symbol}{formatMoney(convertAmount(balance))}</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-500">{currency.symbol}{formatMoney(convertAmount(totalIncome))}</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-border">
          <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-500">{currency.symbol}{formatMoney(convertAmount(totalExpense))}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-background/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense Distribution</h2>
            <button
              onClick={() => setShowPieAsTable(!showPieAsTable)}
              className="px-3 py-2 hover:bg-foreground/5 rounded-lg flex items-center gap-2"
            >
              {showPieAsTable ? '📊 Show Chart' : '📋 Show Table'}
            </button>
          </div>
          <div className="h-[400px]">
            {showPieAsTable ? (
              <ExpenseTable 
                data={pieChartData} 
                currency={currency} 
                formatMoney={formatMoney} 
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%" key={`pie-${theme}`}>
                <PieChart key={`pie-chart-${theme}`}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      // Only show label if the segment is big enough (more than 5%)
                      if (percent < 0.05) return null;

                      const percentage = (percent * 100).toFixed(0);
                      if (isNaN(Number(percentage))) return null;

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#ffffff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="smaller"
                          style={{ 
                            textShadow: '0px 0px 3px rgba(0,0,0,0.5)'
                          }}
                        >
                          {`${percentage}%`}
                        </text>
                      );
                    }}
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={pieColors[index]}
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value, entry: any) => (
                      <span style={{ color: entry.color }}>
                        {value}
                      </span>
                    )}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      padding: '8px 12px'
                    }}
                    formatter={(value: number, name: string) => [
                      `${currency.symbol}${formatMoney(value)}`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl border border-border bg-background/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Monthly Trend</h2>
            <button
              onClick={() => setShowBarAsTable(!showBarAsTable)}
              className="px-3 py-2 hover:bg-foreground/5 rounded-lg flex items-center gap-2"
            >
              {showBarAsTable ? '📊 Show Chart' : '📋 Show Table'}
            </button>
          </div>
          <div className="h-[400px]">
            {showBarAsTable ? (
              <TrendTable 
                data={barChartData} 
                currency={currency} 
                formatMoney={formatMoney} 
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%" key={`bar-${theme}`}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} key={`bar-chart-${theme}`}>
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `${currency.symbol}${formatMoney(value)}`}
                  />
                  <Tooltip 
                    formatter={barTooltipFormatter}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="Income" fill={barColors.income} />
                  <Bar dataKey="Expenses" fill={barColors.expense} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}