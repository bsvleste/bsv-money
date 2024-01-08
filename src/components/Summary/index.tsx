'use client'
import { TransactionContext } from '@/contexts/TransactionsContext'
import { useSummary } from '@/hooks/useSummary'
import { priceFormatter } from '@/utils/formatter'
import {
  ArrowDownCircle,
  ArrowUp,
  ArrowUpCircle,
  DollarSign,
} from 'lucide-react'

export default function Summary() {
  const summary = useSummary()
  return (
    <section className="-mt-20 my-0  mx-auto w-full max-w-[1120px] py-0 px-6 grid grid-cols-3 gap-8">
      <div className="flex flex-col w-full bg-zinc-800 rounded-lg p-8">
        <header className="flex items-center justify-between text-zinc-400">
          <span>Entradas</span>
          <ArrowUpCircle size={32} className="text-green-500" />
        </header>
        <strong className="block mt-4 text-3xl">
          {priceFormatter.format(summary.income)}
        </strong>
      </div>
      <div className="flex flex-col w-full bg-zinc-800 rounded-lg p-8">
        <header className="flex items-center justify-between text-zinc-400">
          <span>Saidas</span>
          <ArrowDownCircle size={32} className="text-red-500" />
        </header>
        <strong className="block mt-4 text-3xl">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </div>
      <div className="flex flex-col w-full bg-green-800 rounded-lg p-8">
        <header className="flex items-center justify-between text-zinc-100">
          <span>Total</span>
          <DollarSign size={32} className="text-zinc-100" />
        </header>
        <strong className="block mt-4 text-3xl ">
          {priceFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  )
}
