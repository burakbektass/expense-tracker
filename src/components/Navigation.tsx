'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CurrencySelect } from '@/components/CurrencySelect';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, languages, t } = useLanguage();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
    const navItems = [
      { href: '/dashboard', label: t('navigation.dashboard'), icon: '📊' },
      { href: '/transactions', label: t('navigation.transactions'), icon: '💳' },
      { href: '/categories', label: t('navigation.categories'), icon: '🏷️' },
    ];
  
    return (
      <>
        <nav className="nav-sidebar">
          <div className="nav-content">
            <div className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('common.appName')}
            </div>
            
            <div className="flex md:flex-col gap-2 md:flex-none">
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

            {/* Mobil için ayarlar butonu */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-foreground/5 rounded-lg"
              >
                ⚙️
              </button>
            </div>

            {/* Desktop ayarlar menüsü */}
            <div className="hidden md:flex flex-col gap-6 mt-auto">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <span>{theme === 'light' ? '🌙' : '☀️'}</span>
                <span>{theme === 'light' ? t('navigation.darkMode') : t('navigation.lightMode')}</span>
              </button>

              <div className="currency-select">
                <label className="block text-sm mb-2">{t('navigation.currency')}</label>
                <CurrencySelect />
              </div>

              <div>
                <label className="block text-sm mb-2">{t('navigation.language')}</label>
                <select
                  value={language.code}
                  onChange={(e) => {
                    const selected = languages.find(l => l.code === e.target.value);
                    if (selected) setLanguage(selected);
                  }}
                  className="language-select select-field"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobil ayarlar modalı */}
        {isSettingsOpen && (
          <div className="settings-modal md:hidden" onClick={() => setIsSettingsOpen(false)}>
            <div className="settings-modal-content" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t('navigation.settings')}</h3>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 hover:bg-foreground/5 rounded-lg"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">{t('navigation.language')}</label>
                  <select
                    value={language.code}
                    onChange={(e) => {
                      const selected = languages.find(l => l.code === e.target.value);
                      if (selected) setLanguage(selected);
                    }}
                    className="select-field w-full"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">{t('navigation.currency')}</label>
                  <CurrencySelect />
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-foreground/5"
                >
                  <span>{theme === 'light' ? '🌙' : '☀️'}</span>
                  <span>{theme === 'light' ? t('navigation.darkMode') : t('navigation.lightMode')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}