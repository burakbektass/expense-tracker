'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, languages, t } = useLanguage();
  
    const navItems = [
      { href: '/dashboard', label: t('navigation.dashboard'), icon: '📊' },
      { href: '/transactions', label: t('navigation.transactions'), icon: '💳' },
      { href: '/categories', label: t('navigation.categories'), icon: '🏷️' },
    ];
  
    return (
      <nav className="nav-sidebar md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-background-10 backdrop-blur-xl border-r border-border p-6">
        <div className="nav-content flex flex-col gap-8">
          <div className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {t('common.appName')}
          </div>
          
          <div className="flex md:flex-col gap-2">
            {navItems.map((item) => (
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
            <span>{theme === 'light' ? t('navigation.darkMode') : t('navigation.lightMode')}</span>
          </button>

          <div className="hidden md:block">
            <label className="block text-sm mb-2">{t('navigation.language')}</label>
            <select
              value={language.code}
              onChange={(e) => {
                const selected = languages.find(l => l.code === e.target.value);
                if (selected) setLanguage(selected);
              }}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border select-field"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    );
  }