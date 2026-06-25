import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PivotDesk — Serious Swing Traders Only',
  description: 'An exclusive community for serious swing traders to share high-quality trade ideas, setups, and market analysis.',
  keywords: 'swing trading, stock market, trade ideas, technical analysis, community',
  openGraph: {
    title: 'PivotDesk',
    description: 'Where serious swing traders share their edge.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-[#0f1117] text-[#e2e8f0]">
        {children}
      </body>
    </html>
  )
}
