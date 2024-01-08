'use client'
import { TransactionsProvider } from '@/contexts/TransactionsContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TransactionsProvider>
      <main className=" h-screen">{children}</main>
    </TransactionsProvider>
  )
}
