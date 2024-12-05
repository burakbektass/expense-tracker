import { CurrencyProvider } from '@/context/CurrencyContext'; 
import { ThemeProvider } from '@/context/ThemeProvider';
import { TransactionProvider } from '@/context/TransactionContext';
import { CategoryProvider } from '@/context/CategoryContext'; 
import Navigation from '@/components/Navigation';
import '@/app/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'BudgetFlow - Personal Finance Management',
    template: '%s | BudgetFlow'
  },
  description: 'Track your expenses, manage budgets, and analyze spending patterns with BudgetFlow. Features include multi-currency support, real-time tracking, and detailed analytics.',
  keywords: ['expense tracker', 'budget management', 'personal finance', 'money management', 'financial planning'],
  authors: [{ name: 'Burak Bektaş' }],
  creator: 'Burak Bektaş',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://budgetflow.vercel.app',
    title: 'BudgetFlow - Personal Finance Management',
    description: 'Track your expenses, manage budgets, and analyze spending patterns with BudgetFlow.',
    siteName: 'BudgetFlow'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BudgetFlow - Personal Finance Management',
    description: 'Track your expenses, manage budgets, and analyze spending patterns with BudgetFlow.',
    creator: '@burakbektas'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Add Google and Yandex verification
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider>
          <CurrencyProvider>
            <TransactionProvider>
              <CategoryProvider>
                <div className="flex">
                  <Navigation />
                  <main className="flex-1 md:ml-64 p-6">
                    {children}
                  </main>
                </div>
              </CategoryProvider>
            </TransactionProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}