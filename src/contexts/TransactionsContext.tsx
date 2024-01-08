import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
  category: string
}

interface CreateTransactionProps {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}
interface TransactionContextType {
  transactions: TransactionProps[]
  fetchTransactions: (query: string) => Promise<void>
  handleCreateTransaction: (data: CreateTransactionProps) => Promise<void>
  getEditTransactionById: (id: number) => Promise<TransactionProps>
}
interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const handleCreateTransaction = useCallback(
    async (data: CreateTransactionProps) => {
      const { description, price, type, category } = data
      const response = await api.post('/transactions', {
        description,
        price,
        type,
        category,
        createdAt: new Date(),
      })
      setTransactions((state) => [response.data, ...state])
      // revalidatePath('/main')
    },
    [],
  )

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get(`/transactions`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  async function getEditTransactionById(id: number) {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        handleCreateTransaction,
        getEditTransactionById,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
