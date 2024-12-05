'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
];

type LanguageContextType = {
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  languages: LanguageOption[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageOption>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        return JSON.parse(savedLanguage);
      }
    }
    return languages[0];
  });

  useEffect(() => {
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 