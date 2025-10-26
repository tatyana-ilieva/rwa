import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { WalletProvider } from '@/contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stellar RWA Platform - Structured Products & Tiered Bonds',
  description: 'Advanced RWA-backed structured products with DEFINDEX integration. Senior/Junior tiered bonds with automated cash flow distribution and risk isolation.',
  keywords: 'RWA, structured products, tiered bonds, DEFINDEX, Soroban, Stellar, DeFi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  )
}
