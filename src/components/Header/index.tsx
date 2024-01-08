'use client'

import Image from 'next/image'
import bsvCode from '../../../public/bsvcode.png'
import * as Dialog from '@radix-ui/react-dialog'
import NewTransactionModal from '../NewTransactionModal'
export default function Header() {
  return (
    <header className="bg-zinc-900 px-10 pb-28">
      <div className="my-0  mx-auto w-full max-w-[1120px] py-0 px-6 flex justify-between items-center">
        <Image
          src={bsvCode}
          alt="bsvConding"
          className="object-scale-down sm:w-[200px] sm:h-[200px]"
          width={350}
          height={350}
        />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="font-roboto h-12 border-0 rounded-lg bg-green-500 font-bold py-0 px-5 cursor-pointer hover:bg-green-700 hover:transition duration-200">
              Nova Transaction
            </button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </div>
    </header>
  )
}
