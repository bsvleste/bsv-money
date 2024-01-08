'use client'
import { ArrowDownCircle, ArrowUpCircleIcon, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { useContext } from 'react'
import { TransactionContext } from '@/contexts/TransactionsContext'
import { revalidatePath } from 'next/cache'

const newTransactionFromSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})
type NewTransactionsFormInputs = z.infer<typeof newTransactionFromSchema>
export default function NewTransactionModal() {
  const { handleCreateTransaction } = useContext(TransactionContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionFromSchema),
  })
  async function handleNewTransaction(data: NewTransactionsFormInputs) {
    await handleCreateTransaction(data)

    reset()
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-zinc-900/90 fixed w-screen h-screen inset-0 " />
      <Dialog.Content className="min-w-[32rem] rounded-lg py-9 px-12 bg-app fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title className="font-bold text-4xl ">
          Nova Transação
        </Dialog.Title>
        <Dialog.Close className="absolute bg-transparent border-0 top-6 right-6 cursor-pointer">
          <X size={24} className="text-zinc-500" />
        </Dialog.Close>
        <form
          onSubmit={handleSubmit(handleNewTransaction)}
          className="mt-8 flex flex-col gap-4 "
        >
          <input
            {...register('description')}
            className="rounded-lg border-0 bg-zinc-800 text-zinc-300 p-4 placeholder:text-zinc-500"
            type="text"
            placeholder="Descrição"
            required
          />
          <input
            {...register('price', { valueAsNumber: true })}
            className="rounded-lg border-0 bg-zinc-800 text-zinc-300 p-4 placeholder:text-zinc-500"
            type="number"
            placeholder="Preço"
            required
          />
          <input
            {...register('category')}
            className="rounded-lg border-0 bg-zinc-800 text-zinc-300 p-4 placeholder:text-zinc-500"
            type="text"
            placeholder="Categoria"
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="grid grid-cols-2 gap-4 mt-2"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioGroup.Item
                    value={'income'}
                    className={clsx(
                      'group  bg-zinc-800 data-[state=unchecked]:hover:bg-zinc-700 data-[state=checked]:bg-green-500 p-4 rounded-lg',
                      'flex items-center justify-center gap-2 border-0',
                      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 ',
                    )}
                  >
                    Entrada
                    <ArrowUpCircleIcon
                      size={18}
                      className="group-data-[state=checked]:text-zinc-100 text-green-500"
                    />
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={'outcome'}
                    className={clsx(
                      'group bg-zinc-800 data-[state=unchecked]:hover:bg-zinc-700 data-[state=checked]:bg-red-500',
                      'p-4 rounded-lg flex items-center justify-center gap-2 border-0',
                      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 ',
                    )}
                  >
                    Saida
                    <ArrowDownCircle
                      size={18}
                      className="group-data-[state=checked]:text-zinc-100 text-red-500"
                    />
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              'disabled:opacity-10 disabled:cursor-not-allowed  mt-5 h-14 border-0 rounded-lg',
              'w-full text-zinc-100 bg-green-500 font-bold px-0 py-5 cursor-pointer enabled:hover:bg-green-700',
              'hover:transition duration-200',
            )}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
