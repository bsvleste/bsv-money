'use client'
import { TransactionContext } from '@/contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '@/utils/formatter'
import clsx from 'clsx'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import EditTransactionModal from '../EditTransactionModal'
interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
  category: string
}
export default function SummaryTable() {
  const { transactions, getEditTransactionById } =
    useContext(TransactionContext)
  const [transaction, setTransaction] = useState<TransactionProps>()
  async function handleEditTransaction(id: number) {
    const res = await getEditTransactionById(id)
    setTransaction(res)
  }
  return (
    <>
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="mb-2 w-full flex justify-between items-center bg-zinc-800 rounded-lg px-8 py-4"
          >
            <div className="w-96">
              <p className="font-light text-zinc-300">
                {transaction.description}
              </p>
            </div>
            <div className="flex gap-4">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    className="p-1 rounded-lg hover:text-green-700   text-green-500"
                    onClick={() => handleEditTransaction(transaction.id)}
                  >
                    <EditIcon size={18} />
                  </button>
                </Dialog.Trigger>
                <EditTransactionModal
                  description={transaction.description}
                  price={transaction.price}
                  category={transaction.category}
                  id={transaction.id}
                  type={transaction.type}
                />
                <button className="p-1 rounded-lg hover:text-zinc-700   text-zinc-500">
                  <Trash2Icon size={18} />
                </button>
              </Dialog.Root>
            </div>
            <span
              className={clsx('font-bold', {
                'text-red-500': transaction.type === 'outcome',
                'text-green-500': transaction.type === 'income',
              })}
            >
              {transaction.type === 'outcome' && '- '}
              {priceFormatter.format(transaction.price)}
            </span>
            <p className="font-light text-zinc-300">{transaction.category}</p>
            <p className="font-light text-zinc-300">
              {dateFormatter.format(new Date(transaction.createdAt))}
            </p>
          </div>
        ))}
    </>
  )
}
