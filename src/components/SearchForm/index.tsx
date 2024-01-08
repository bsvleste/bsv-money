'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchCheckIcon } from 'lucide-react'
import { memo, useContext } from 'react'
import { TransactionContext } from '@/contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
})
type SearchFormInputs = z.infer<typeof searchFormSchema>
function SearchFormComponent() {
  const { fetchTransactions } = useContext(TransactionContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }
  return (
    <form
      onSubmit={handleSubmit(handleSearchTransactions)}
      className=" flex gap-4 mt-6 my-0  mx-auto w-full max-w-[1120px] py-0 px-6"
    >
      <input
        type="text"
        className="flex-1 rounded-lg bg-zinc-900 p-4 placeholder:text-zinc-500 border-0"
        placeholder="Buscar transações"
        {...register('query')}
      />
      <button
        disabled={isSubmitting}
        type="submit"
        className="group flex justify-center items-center  rounded-lg gap-3 border-green-600 disabled:opacity-10 disabled:cursor-not-allowed  border-2 p-4 text-green-600 hover:enabled:text-zinc-100 hover:enabled:bg-green-600 hover:transition-all duration-200 bg-transparent"
      >
        <SearchCheckIcon
          size={20}
          className="group-hover:text-zinc-100 transition-all text-green-600"
        />
        Buscar
      </button>
    </form>
  )
}

export const SearchForm = memo(SearchFormComponent)
