'use client'
import Header from '@/components/Header'
import { SearchForm } from '@/components/SearchForm'
import Summary from '@/components/Summary'
import SummaryTable from '@/components/SummaryTable'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Main() {
  return (
    <div className="">
      <Header />
      <Summary />
      <SearchForm />
      <div className="mt-6 my-0  mx-auto w-full max-w-[1120px] py-0 px-6">
        <SummaryTable />
      </div>
    </div>
  )
}
Main.requireAuth = true
