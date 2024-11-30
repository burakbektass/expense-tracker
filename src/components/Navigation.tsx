'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const { currency, setCurrency, currencies } = useCurrency();
  
    return (
      <nav className="nav-sidebar md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-background-10 backdrop-blur-xl border-r border-border p-6">
        <div className="nav-content flex flex-col gap-8">
          <div className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ExpenseTracker
          </div>
          
          <div className="flex md:flex-col gap-2">
            {[
              { href: '/dashboard', label: 'Dashboard', icon: '📊' },
              { href: '/transactions', label: 'Transactions', icon: '💳' },
              { href: '/categories', label: 'Categories', icon: '🏷️' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <span>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
  
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-foreground-5 transition-colors mt-auto"
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <div className="hidden md:block">
            <label className="block text-sm mb-2">Currency</label>
            <select
              value={currency.code}
              onChange={(e) => {
                const selected = currencies.find(c => c.code === e.target.value);
                if (selected) setCurrency(selected);
              }}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border select-field"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    );
  }