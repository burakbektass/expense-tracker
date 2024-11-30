import { CurrencyProvider } from '@/context/CurrencyContext'; 
import { ThemeProvider } from '@/context/ThemeContext';
import { TransactionProvider } from '@/context/TransactionContext';
import { CategoryProvider } from '@/context/CategoryContext'; 
import Navigation from '@/components/Navigation';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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