import { ThemeProvider } from '../context/ThemeContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { TransactionProvider } from '@/context/TransactionContext';
import Navigation from '@/components/Navigation';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Expense Tracker",
  description: "Modern expense tracking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <CategoryProvider>
          <TransactionProvider>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased main-container`}>
              <Navigation />
              <main className="main-content md:ml-64">
                {children}
              </main>
            </body>
          </TransactionProvider>
        </CategoryProvider>
      </ThemeProvider>
    </html>
  );
}