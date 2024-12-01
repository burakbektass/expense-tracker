'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
};

type ExchangeRates = {
  [key: string]: number;
};

type CurrencyContextType = {
  currency: CurrencyOption;
  setCurrency: (currency: CurrencyOption) => void;
  currencies: CurrencyOption[];
  convertAmount: (amount: number, fromCurrency?: string) => number;
  isLoading: boolean;
};

const currencies: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyOption>(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        return JSON.parse(savedCurrency);
      }
    }
    return currencies[0];
  });
  const [rates, setRates] = useState<ExchangeRates>({});

  useEffect(() => {
    // Set loading to false after initial currency is loaded
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    }
  }, [currency, isLoading]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchRates();
    // Refresh rates every hour
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Convert amount from USD to selected currency
  const convertAmount = (amount: number, fromCurrency: string = 'USD'): number => {
    if (!rates[currency.code] || !rates[fromCurrency]) return amount;
    
    if (fromCurrency === currency.code) {
      // If the amount is already in the target currency, return as is
      return amount;
    }
    
    if (fromCurrency === 'USD') {
      // Converting from USD to selected currency
      return amount * rates[currency.code];
    } else {
      // Converting from source currency to selected currency via USD
      const amountInUSD = amount / rates[fromCurrency];
      return amountInUSD * rates[currency.code];
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      currencies, 
      convertAmount,
      isLoading 
    }}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      ) : (
        children
      )}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}